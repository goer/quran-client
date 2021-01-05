import Vue from "vue";
import VueRouter from "vue-router";
import QuranAyat from "./components/QuranAyat";
import QuranSurah from "./components/QuranSurah";
import Quran from "./components/Quran";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Quran,
    children: []
  },
  {
    path: "/surat/:surat/ayat/:ayat",
    name: "quranayat",
    component: QuranAyat
  },
  {
    path: "/surat/:surat",
    name: "quransurah",
    component: QuranSurah
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;
