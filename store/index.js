import OrbitDbVuexPlugin from '~/shared_store/OrbitDbVuexPlugin'
import config from '~/config'
import IpfsPlugin from '~/plugins/IpfsPlugin'

const orbitDbVuexPlugin = new OrbitDbVuexPlugin(IpfsPlugin.ipfs)

export const state = () => ({
  log: 'loading...',
  audioSrc: '',
  audioStatus: '',
  audioPaused: true,
})

export const plugins = [orbitDbVuexPlugin]
