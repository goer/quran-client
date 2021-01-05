<template>
  <v-container fluid>
    <!-- <v-navigation-drawer app> </v-navigation-drawer> -->
    <v-app-bar app color="elevation-0">
      <v-btn icon>
        <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title
        >{{ surah.title_latin }} - {{ surah.title_id }} -
        {{ surah.ayat_no }}</v-toolbar-title
      >
       <v-spacer></v-spacer>
      <v-btn icon @click="playAudio(surah.id)">
        <v-icon>mdi-volume-high</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card v-if="surah">
      <v-card-title>
        {{ surah.ayat_ar }}
      </v-card-title>
      <v-card-text></v-card-text>
      <v-card-text>{{ surah.ayat_id }}</v-card-text>
      <v-card-text>{{ surah.tafsir_id }}</v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { Quran } from "../js/quran";
import { AudioPlayerSync } from "../js/audio";
export default {
  name: "QuranAyat",
  created() {
    this.audiosync = new AudioPlayerSync();
  },
  deactivated() {
    console.log('deactiivated')
    this.audiosync.reset();
  },
  async activated() {
    console.log("routexr", this.$route.params);
    this.quran = new Quran();
    this.surah = await this.quran.getSurahAyat(
      this.$route.params.surat,
      this.$route.params.ayat
    );
    console.log("surahx", this.surah);
  },
  data() {
    return {
      quran: null,
      surah: null,
    };
  },
  methods: {
    async playAudio(id) {
      console.log('audio:',id)
      await this.audiosync.playAudioAR(id);
      await this.audiosync.playAudioID(id);
    },
  },
};
</script>