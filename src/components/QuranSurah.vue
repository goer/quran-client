<template>
  <v-container fluid>
    <!-- <v-navigation-drawer app> </v-navigation-drawer> -->
    <v-app-bar app color="elevation-0">
      <v-btn icon>
        <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title
        >{{ surahs[0].title_latin }} - {{ surahs[0].title_id }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn icon @click="startStopAudio(0)">
        <v-icon>mdi-volume-high</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-nfc</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title
              ><v-checkbox
                v-model="audiosync.langs.id"
                label="Indonesia"
              ></v-checkbox>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              ><v-checkbox
                v-model="audiosync.langs.ar"
                label="Arabic"
              ></v-checkbox>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-card class="mx-auto" tile>
      <v-list-item
        two-line
        v-for="(surah, index) in surahs"
        :key="index"
        :id="'ayat_' + surah.id"
        :ref="'ayat_' + surah.id"
        :class="{ selected: selected_id == surah.id }"
      >
        <v-list-item-content>
          <v-list-item-title
            ><a @click="gotoAyat(surah)">{{ surah.ayat_no }}</a
            ><v-btn icon @click="startStopAudio(index)">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
          </v-list-item-title>
          <v-card-text
            >{{ surah.ayat_ar }}
            <v-spacer></v-spacer>
            <v-btn icon @click="audiosync.playAudioAR(surah.id)">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text
            >{{ surah.ayat_id }} <v-spacer></v-spacer>
            <v-btn icon @click="audiosync.playAudioID(surah.id)">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>
<script>
import { Quran } from "../js/quran";
import { AudioPlayerSync } from "../js/audio";
export default {
  name: "QuranSurah",
  created() {
    this.audiosync = new AudioPlayerSync();
  },
  async activated() {
    // console.log("routexyyy", this.$route.params);
    this.quran = new Quran();
    this.surahs = await this.quran.getSurah(this.$route.params.surat);
    // this.$vuetify.goTo('#'+this.surahs[10].id)
    // console.log("surahx", this.surahs);
  },
  deactivated() {
    console.log("deactiivated");
    this.audiosync.reset();
  },
  watch: {
    "audiosync.playingID": function (newValue, oldValue) {
      // here you can do whatever you want
      if (newValue == null) return false;
      console.log("playing audio", oldValue, newValue);
      // if(oldValue<newValue) newValue = oldValue
      this.selected_id = newValue;
      this.$vuetify.goTo("#ayat_" + newValue);
      // this.$refs['#ayat_'+newValue].style['background-color'] = 'red'
      // var el = this.$refs['ayat_'+newValue][0]
      // el.classes['selected']=true
      // console.log('el',el.color)
    },
  },
  data() {
    return {
      isAudioStart: false,
      selected_id: "",
      langs: {
        ar: false,
        id: true,
      },
      quran: null,
      surahs: null,
      audiosync: null,
    };
  },
  methods: {
    async startStopAudio(index = 0) {
      this.isAudioStart = !this.isAudioStart;
      if (this.isAudioStart) {
        this.audiosync.playAllAudio(this.surahs, index);
      } else {
        await this.audiosync.reset();
      }
    },
    gotoAyat(surah) {
      this.$router.push({
        name: "quranayat",
        params: { surat: surah.surat_no, ayat: surah.ayat_no },
      });
    },
  },
};
</script>
<style scoped>
.selected {
  background-color: yellow;
}
</style>