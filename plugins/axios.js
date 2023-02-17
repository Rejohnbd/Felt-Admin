export default function ({ app, $axios, $config, env }) {
  // $axios.setHeader("api_secret_key", process.env.API_SECRET_KEY);
  // $axios.setHeader("Accept-Language", app.i18n.locale);
  // app.$axios.defaults.headers.common["Accept-Language"] = app.i18n.locale;
  // $axios.setBaseURL($config.remoteBaseUrl + "/api/");
  $axios.onRequest((config) => {
    config.headers.common["api_secret_key"] = process.env.API_SECRET_KEY;
    config.headers.common["Accept-Language"] = app.i18n.locale;
  });
}
