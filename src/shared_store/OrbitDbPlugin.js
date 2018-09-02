import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

// const ipfsConfig = {
//   EXPERIMENTAL: {
//     pubsub: true
//   }
// }

const OrbitDBPlugin = function (ipfsConfig) {
  console.log(ipfsConfig);
  this.config = ipfsConfig;

  return {
    install: async function (Vue) {
      const ipfs = new IPFS({ ...ipfsConfig });

      console.log('Installing OrbitDB ...')
      function createDB() {
        new Promise((resolve, reject) => {
          ipfs.on('error', e => reject(e))
          ipfs.on('ready', async () => {
            // Create a database
            const orbitdb = new OrbitDB(ipfs)

            const db = await orbitdb.docstore('obligatron.test')
            resolve(db)
          })
        })
      }

      try {
        const db = await createDB()
        Vue.prototype.orbit = {
          get(query) {
            return db.get(query)
          },
          put(doc) {
            return db.put(doc)
          },
          query(queryFn) {
            return db.query(queryFn)
          }
        }
        console.log('OrbitDB installed ...')
      } catch (e) {
        console.log(e, 'Error installing orbit-db plugin...')
      }
    }
  }
}

module.exports = { OrbitDBPlugin };
