import Vue from 'vue'
import IPFS from 'ipfs-core'
import config from '~/ipfs.config'

async function ipfsPlugin({ app }, inject) {
  inject('ipfs', await ipfsPlugin.ipfs)

  // const ipfsPlugin = new IpfsPlugin(config.ipfs, inject);
  // Vue.use(ipfsPlugin);
}

ipfsPlugin.ipfs = IPFS.create({ ...config.ipfs });

export default ipfsPlugin
