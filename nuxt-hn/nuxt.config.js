export default {
  // SPA (need for capacitor.js)
  // https://serversideup.net/using-nuxtjs-to-build-an-ios-and-android-app/
  ssr: false,
  target: 'static',

  // For live-reload debug with Capacitor.js
  server: {
    host: '0.0.0.0',
    port: 3000
  },

  // backend
  serverMiddleware: [
    { path: '/api/home', handler: '@/api/home.js' },
    { path: '/api/article', handler: '@/api/article.js' }
  ],

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Homme-Nouveau',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/capacitor', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '@/components',
      '@/components/layouts',
      '@/components/cards',
      '@/components/buttons'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
