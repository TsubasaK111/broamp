import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

const createOrbitDBVuexPlugin = async function (ipfsConfig) {
  this.config = ipfsConfig;

  const ipfs = new IPFS({ ...ipfsConfig });
  console.log('Installing OrbitDB ...')

  function createDB() {
    return new Promise((resolve, reject) => {
      ipfs.on('error', e => reject(e))
      ipfs.on('ready', async () => {

        // Create a database
        const orbitdb = new OrbitDB(ipfs);
        const accessRights = {
          // give access to everyone
          write: ['*'],
        };
        const db = await orbitdb.keyvalue('broampSharedStore', accessRights);

        await db.load();
        console.log("orbit db ready! address:", db.address.toString());
        resolve(db);
      })
    })
  }

  try {
    const db = await createDB();
    return (store) => {

      db.events.on('replicated', (address) => {
        console.log(`DB just replicated with peer ${address}.`)
        const newState = {
          audioSrc: db.get('audioSrc'),
          audioStatus: db.get('audioStatus'),
          audioPaused: db.get('audioPaused'),
        }
        console.log('store.state', store.state);
        console.log('newstate:', newState);

        Object.entries(newState).forEach(([key, value]) => {
          if (value !== store.state[key] && value !== undefined) {
            console.log(`newstate detected:`, value, store.state[key], value === store.state[key]);
            switch (key) {
              case ('audioSrc'):
                store.dispatch("recieveAudioSrc", value);
                return;
              case ('audioStatus'):
                console.log('recieveAudioStatus. audioStatus:', value)
                store.dispatch("recieveAudioStatus", value);
                return;
              case ('audioPaused'):
                value ?
                  store.dispatch("recieveAudioPause") :
                  store.dispatch("recieveAudioPlay");
                return;
              default:
                // do nothing.              
            }
          }
        });
      });

      db.events.on('write', (dbname, hash, entry) => {
        console.log('write triggered');
      })

      store.subscribe(mutation => {
        switch (mutation.type) {
          case ('broadcastAudioSrc'):
            console.log('broadcastAudioSrc subs', mutation.payload);
            db.put('audioSrc', mutation.payload);
            return;
          case ('broadcastAudioStatus'):
            console.log('broadcastAudioStatus subs. audioStatus:', mutation.payload);
            db.put('audioStatus', mutation.payload);
            return;
          case ('broadcastAudioPlay'):
            db.put('audioPaused', false);
            return;
          case ('broadcastAudioPause'):
            db.put('audioPaused', true);
            return;
          default:
          // do nothing.
        }
      });
    }
    console.log('OrbitDB installed!')

  } catch (e) {
    console.log(e, 'Error installing orbit-db plugin...')
  }
}

module.exports = { createOrbitDBVuexPlugin };
