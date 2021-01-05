// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import vuetify from "./vuetify.js";
// import "vuetify/dist/vuetify.min.css";

import underscore from "vue-underscore";
Vue.use(underscore);

Vue.config.productionTip = true;

new Vue({
  router,
  vuetify: vuetify,
  render: (h) => h(App),
  mounted() {}
}).$mount("#app");
