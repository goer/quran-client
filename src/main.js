// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import underscore from "vue-underscore";
Vue.use(underscore);

Vue.use(Vuetify);
const opts = {
  icons: {
    iconfont: "mdi"
  }
};

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify: new Vuetify(opts),
  render: (h) => h(App),
  mounted() {}
}).$mount("#app");
