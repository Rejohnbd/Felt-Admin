import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC16FddNygL3MqmiXe0SNsaH9tUBM-J7rY",
    libraries: "places",
  },
  installComponents: true,
});
