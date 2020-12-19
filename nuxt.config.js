import fs from 'fs'
import path from 'path'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  server: {
    https: {
      // NOTE: use mkcert to self-sign a SSL cert for localhost HTTPS & WSS
      // TODO: make dev/prod split certs
      key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
    }
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'broamp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/IpfsPlugin.js' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isDev, isClient }) {
      if(isClient){
          config.externals = [
            "dns",
            // other server-only dependencies that we may have to exclude:
            // "child_process",
            // "fs",
            // "net",
            // "tls",
          ]
      }
    }
  },
}
