// import { _ } from "vue-underscore";
const axios = require("axios");

class Quran {
  constructor() {
    // this.baseUrl = "https://quran.fonetix.vercel.app";
    // this.baseUrl = "http://localhost:3000";
    this.baseUrl = "https://quran-d8588.et.r.appspot.com"
  }

  async search(keywords) {
    var search_results = await axios.get(this.baseUrl + "/search/" + keywords);
    return search_results.data;
  }

  async getSurah(surah_no) {
    var surahs = await axios.get(this.baseUrl + "/surat/" + surah_no);
    // console.log("surah", surahs.data);
    return surahs.data;
  }

  async getSurahAyat(surah_no, ayat_no) {
    console.log("getSurahAyat", surah_no, ayat_no);
    var surah = await axios.get(
      this.baseUrl + "/surat/" + surah_no + "/" + ayat_no
    );
    // console.log("surah", surah.data);
    return surah.data;
  }
}

export { Quran };
