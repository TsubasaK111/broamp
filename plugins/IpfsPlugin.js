import Vue from "vue";
import IPFS from 'ipfs-core'
import config from "~/config";

const IpfsPlugin = function (ipfsConfig, inject) {
    this.config = ipfsConfig;
    return {
        install: async (Vue, ipfsConfig, state) => {
            const ipfs = await IPFS.create({ ...this.config });

            inject('ipfs', ipfs);
        }
    }
}

export default async ({ app }, inject) => {
    const ipfs = await IPFS.create();
    // TODO: make ipfs node configurable:
    // const ipfs = await IPFS.create({ ...config });
    
    inject('ipfs', ipfs);
    console.log('ipfs injected?');

    // const ipfsPlugin = new IpfsPlugin(config.ipfs, inject);
    // Vue.use(ipfsPlugin);
}

