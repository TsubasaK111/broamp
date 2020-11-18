import OrbitDbVuexPlugin from '~/shared_store/OrbitDbVuexPlugin'
import config from '~/config'
import IpfsPlugin from '~/plugins/IpfsPlugin'

const orbitDbVuexPlugin = new OrbitDbVuexPlugin(IpfsPlugin.ipfs)

export const plugins = [orbitDbVuexPlugin]

// export const mutations = { ... }
// export const actions = { ... }
