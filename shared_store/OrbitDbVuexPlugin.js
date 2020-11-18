import OrbitDB from 'orbit-db'
import IPFS from 'ipfs-core'

export default class OrbitDBVuexPlugin {
  constructor(ipfs) {
    this.createDB(ipfs)
    return this.install()
  }

  install() {
    try {
      const db = this.db || { events: {on: ()=>{}}}
      console.log('this.db', this.db)

      return (store) => {
        db.events.on('replicated', (address) => {
          console.log(`DB just replicated with peer ${address}.`)
          const newState = {
            audioSrc: db.get('audioSrc'),
            audioStatus: db.get('audioStatus'),
            audioPaused: db.get('audioPaused'),
          }
          console.log('store.state', store.state)
          console.log('newstate:', newState)
    
          Object.entries(newState).forEach(([key, value]) => {
            if (value !== store.state[key] && value !== undefined) {
              console.log(`newstate detected:`, value, store.state[key], value === store.state[key])
              switch (key) {
                case ('audioSrc'):
                  store.dispatch("recieveAudioSrc", value)
                  return
                case ('audioStatus'):
                  console.log('recieveAudioStatus. audioStatus:', value)
                  store.dispatch("recieveAudioStatus", value)
                  return
                case ('audioPaused'):
                  value ?
                    store.dispatch("recieveAudioPause") :
                    store.dispatch("recieveAudioPlay")
                  return
                default:
                // do nothing.              
              }
            }
          })
        })
    
        db.events.on('write', (dbname, hash, entry) => {
          console.log('write triggered')
        })
    
        store.subscribe(mutation => {
          switch (mutation.type) {
            case ('broadcastAudioSrc'):
              console.log('broadcastAudioSrc subs', mutation.payload)
              db.put('audioSrc', mutation.payload)
              return
            case ('broadcastAudioStatus'):
              console.log('broadcastAudioStatus subs. audioStatus:', mutation.payload)
              db.put('audioStatus', mutation.payload)
              return
            case ('broadcastAudioPlay'):
              db.put('audioPaused', false)
              return
            case ('broadcastAudioPause'):
              db.put('audioPaused', true)
              return
            default:
            // do nothing.
          }
        })
      }
    } catch (e) {
      console.log(e, 'Error installing orbit-db plugin...')
    }
  }

  async createDB(ipfs) {
    // reuses same IPFS node used for uploading audio files (in debug.vue)
    this.ipfs = await ipfs

    const { cid } = await this.ipfs.add('Hello world')
    console.info('cid',cid)

    console.log('Installing OrbitDB Vuex Plugin ...')
    
    // Create a database
    const orbitdb = await OrbitDB.createInstance(this.ipfs)
    
    const accessRights = {
      // give access to everyone
      write: ['*'],
    }
    this.db = await orbitdb.keyvalue('broampSharedStore', accessRights)

    await this.db.load()
    console.log("orbit db installed and ready! address:", this.db.address.toString())
    return this.db
  }
}