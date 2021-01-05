<template>
  <v-app>
    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
// import HomeContent from "./components/HomeContent";
// import Quran from "./components/Quran";

export default {
  name: "App",
  components: {
    // Quran,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
#app {
  margin: 4px;
}
.v-btn {
  margin: 4px;
}
.v-card {
  margin: 8px;
}
.v-text-field {
  margin: 8px;
}
</style>

