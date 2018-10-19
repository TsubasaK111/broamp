import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

const OrbitDBMgr = async function (ipfsConfig) {
  this.config = ipfsConfig;

  const ipfs = new IPFS({ ...ipfsConfig });

  console.log('Installing OrbitDB ...')

  function createDB() {
    new Promise((resolve, reject) => {
      ipfs.on('error', e => reject(e))
      ipfs.on('ready', async () => {
        // Create a database
        const orbitdb = new OrbitDB(ipfs)

        const db = await orbitdb.keyvalue('broampSharedStore')

        console.log(db)
        resolve(db)
      })
    })
  }

  try {
    const db = await createDB();
    console.log(db)
    return db;
    // return {
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

module.exports = { OrbitDBMgr };
