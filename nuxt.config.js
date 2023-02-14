export default {
  // loading: "~/components/Loading.vue",
  ssr: false,
  target: "server",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Felt Management :: ",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "vue-toastification/nuxt",
    "@nuxtjs/auth-next",
  ],

  generate: { fallback: true },

  // Route Auth
  router: {
    middleware: ["auth"],
  },

  i18n: {
    locales: ["en", "bn"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: require("./langs/en.json"),
        bn: require("./langs/bn.json"),
      },
    },
  },

  auth: {
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: false,
      home: "/",
    },
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "http://localhost:8000",
        endpoints: {
          login: {
            url: "/login",
          },
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8000",
    credential: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
