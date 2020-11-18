import IPFS from 'ipfs-core'
import OrbitDB from 'orbit-db'

//  TODO: make this a Vuex plugin.
const OrbitDBPlugin = async function (ipfsConfig) {
  console.log(ipfsConfig);
  this.config = ipfsConfig;

  return {
    install: async function (Vue) {
      
      
      async function createDB() {
        console.log('Installing OrbitDB Plugin ...')
        const ipfs = await IPFS.create({ ...ipfsConfig });

        const orbitdb = new OrbitDB(ipfs)
        const db = await orbitdb.keyvalue('broampSharedStore')  
        //   new Promise((resolve, reject) => {
        //     ipfs.on('error', e => reject(e))
        //     ipfs.on('ready', async () => {
        //       // Create a database
        //       const orbitdb = new OrbitDB(ipfs)

        //       const db = await orbitdb.keyvalue('broampSharedStore')
        //       resolve(db)
        //     })
        //   })
      }

      try {
        Vue.prototype.$orbit = await createDB();
        // Vue.prototype.$orbit = db;
        // Vue.prototype.$orbit = {
        //   get(query) {
        //     return db.get(query);
        //   },
        //   put(doc) {
        //     return db.put(doc);
        //   },
        //   onReplicated: async (callback) => {
        //     return db.events.on('replicated', callback)
        //   },
        // }
        console.log('OrbitDB installed ...')
      } catch (e) {
        console.log(e, 'Error installing orbit-db plugin...')
      }
    }
  }
}

module.exports = { OrbitDBPlugin };
