// import { resolve } from 'path'
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // env: {
  //   baseApi: process.env.BASE_API,
  //   baseApiAttachment: process.env.BASE_API_ATTACHMENT,
  //   baseUrl: process.env.BASE_URL,
  //   appName: process.env.APP_NAME,
  //   baseRoute: process.env.BASE_ROUTE,
  //   apiKeyFinger: process.env.API_KEY_FINGER,
  //   eportalUrl: process.env.EPORTAL_URL,
  //   eportalApiUrl: process.env.EPORTALAPI_URL,
  //   serverLocation: process.env.SERVER_LOCATION,
  // },
  // publicRuntimeConfig: {
  //   baseApi: process.env.BASE_API,
  //   nodeEnv: process.env.NODE_ENV,
  //   appName: process.env.APP_NAME
  // },

  // alias: {
  //   'components': resolve(__dirname, './components')
  // },

  // loading: {
  //   color: 'green',
  //   height: '5px'
  // },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - project_nuxt',
    title: 'project_nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/laravel-echo', {
      broadcaster: 'pusher',
      // authModule: true,
      // connectOnLogin: true,
      // disconnectOnLogout: true,
      wsHost: '127.0.0.1',
      wsPort: '6001',
      key: '2c1b8d62111da9e9c97e123',
      enableTransports: ['ws'],
      cluster: 'mt1',
      forceTLS: false
    }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'nuxt-sweetalert2'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    credentials: true,
    baseURL: process.env.BASE_API // Used as fallback if no runtime config is provided
  },
  auth: {
    localStorage: {
      prefix: process.env.AUTH_PREFIX
    },
    cookie: {
      prefix: process.env.AUTH_PREFIX
    },
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.BASE_API,
        endpoints: {
          login: {
            url: '/api/auth/login'
          },
          logout: {
            url: '/api/auth/logout'
          },
          user: {
            url: '/api/auth/me'
          }
        }
      },

      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.BASE_API,
        endpoints: {
          login: {
            url: '/api/auth/login'
          },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          logout: {
            url: '/api/auth/logout'
          },
          user: {
            url: '/api/auth/me'
          }
        },
        token: {
          property: 'token',
          maxAge: 31104000,
          global: true
        },
        refreshToken: {
          property: 'token',
          data: 'token',
          maxAge: 60 * 60 * 8
        }
      },

      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          maxAge: 60 * 60 * 8
          // required: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'token',
          data: 'token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: process.env.LOGIN_URL, method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/me', method: 'get' },
          refresh: { url: '/api/auth/refresh-token', method: 'post' }
        }
      }
    },
    redirect: {
      login: 'login',
      logout: '/',
      home: '/',
    }
  },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      // light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          secondary: '#243238'
        }
      },
    },
  },

  router: {
    base: process.env.BASE_ROUTE,
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 3000,
  }
}
