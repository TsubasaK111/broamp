import OrbitDB from 'orbit-db'
import IPFS from 'ipfs-core'
import EventEmitter from 'events'

export default class OrbitDBVuexPlugin {
  constructor(ipfs) {
    this.createInitEvents()
    this.createDB(ipfs)
    return this.install()
  }

  // event listener/emitter for detecting when orbitDb is actually ready.
  createInitEvents() {
    this.initEvents = new EventEmitter()
  }


  async createDB(ipfs) {
    // reuses same IPFS node used for uploading audio files (in debug.vue)
    this.ipfs = await ipfs

    console.log('installing OrbitDB Vuex Plugin ...')

    // Create a database
    const orbitdb = await OrbitDB.createInstance(this.ipfs)

    const accessRights = {
      // give access to everyone
      write: ['*'],
    }

    const keyValueDb = await orbitdb.keyvalue('broampSharedStore', accessRights)
    await keyValueDb.load()

    console.log('loaded keyValueDb:', keyValueDb)
    console.log('loaded keyValueDb length:', Object.keys(keyValueDb).length)

    await keyValueDb.put('cheese', 'fromage')

    console.log(keyValueDb.get('cheese'));
    // event is caught in mocked db passed to Vuex
    this.initEvents.emit('actualDbReady', keyValueDb)
  }

  install() {
    try {
      const initEvents = this.initEvents

      return (store) => {
        initEvents.on('actualDbReady', (actualDb) => {
          console.log(
            'orbitDb installed and ready! address:',
            actualDb.address.toString()
          )

          const db = actualDb

          db.events.on('replicated', (address) => {
            console.log(`db just replicated with peer ${address}.`)
            const newState = {
              audioSrc: db.get('audioSrc'),
              audioStatus: db.get('audioStatus'),
              audioPaused: db.get('audioPaused'),
            }
            console.log('store.state', store.state)
            console.log('newState:', newState)

            Object.entries(newState).forEach(([key, value]) => {
              if (value !== store.state[key] && value !== undefined) {
                console.log(
                  `newState detected:`,
                  value,
                  store.state[key],
                  value === store.state[key]
                )
                switch (key) {
                  case 'audioSrc':
                    store.dispatch('recieveAudioSrc', value)
                    return
                  case 'audioStatus':
                    console.log('recieveAudioStatus. audioStatus:', value)
                    store.dispatch('recieveAudioStatus', value)
                    return
                  case 'audioPaused':
                    value
                      ? store.dispatch('recieveAudioPause')
                      : store.dispatch('recieveAudioPlay')
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

          store.subscribe((mutation) => {
            switch (mutation.type) {
              case 'broadcastAudioSrc':
                console.log('broadcastAudioSrc subs', mutation.payload)
                db.put('audioSrc', mutation.payload)
                return
              case 'broadcastAudioStatus':
                console.log(
                  'broadcastAudioStatus subs. audioStatus:',
                  mutation.payload
                )
                db.put('audioStatus', mutation.payload)
                return
              case 'broadcastAudioPlay':
                db.put('audioPaused', false)
                return
              case 'broadcastAudioPause':
                db.put('audioPaused', true)
                return
              default:
              // do nothing.
            }
          })
          console.log('actual keyvalue db merged:', db)
          console.log('merged keyValueDb length:', Object.keys(db).length)
        })
      }
    } catch (e) {
      console.log(e, 'Error installing orbit-db plugin...')
    }
  }
}
