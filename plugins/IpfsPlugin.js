import Vue from 'vue'
import IPFS from 'ipfs-core'
import config from '~/config'

async function ipfsPlugin({ app }, inject) {
  console.log('installing IpfsPlugin...')

  inject('ipfs', await ipfsPlugin.ipfs)
  console.log('ipfs injected?')

  // const ipfsPlugin = new IpfsPlugin(config.ipfs, inject);
  // Vue.use(ipfsPlugin);
}

ipfsPlugin.ipfs = IPFS.create()
// TODO: make ipfs node configurable:
// ipfsPlugin.ipfs = IPFS.create({ ...config });

export default ipfsPlugin
