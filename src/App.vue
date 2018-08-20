<template>
    <div id="app">

        <v-toolbar dense>
            <v-toolbar-title class="oswald font-weight-bold">Title</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon class="hidden-sm-and-up" :to="{name:'MapPage'}">
                <v-icon class="primary-color">place</v-icon>
            </v-btn>

            <v-btn icon class="hidden-sm-and-up" :to="{name:'Informations'}">
                <v-icon class="primary-color">info</v-icon>

            </v-btn>

            <v-btn flat class="hidden-xs-only primary-color" :to="{name:'MapPage'}">
                <v-icon>place</v-icon>
                Carte
            </v-btn>

            <v-btn flat class="hidden-xs-only primary-color" :to="{name:'Informations'}">
                <v-icon>info</v-icon>
                Informations
            </v-btn>
            <!-- v-model="Vue.prototype.$lang.lang" -->
            <select name="yoyo" id="" v-model="selected" >
                <option v-for="item in items" :key="item">{{item}}</option>
            </select>

        </v-toolbar>

        <router-view/>
    </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  data: () => ({
    items: ["fr", "en", "nl"],
    selected: "fr"
  }),
  created() {
    console.log(Vue.prototype.$lang.lang);
    Vue.prototype.$lang.lang = "parata";
    console.log("created",Vue.prototype.$lang.lang);
  },
  watch: {
    selected: function(oldValue, newValue) {

      Vue.prototype.$lang.lang = newValue;
      console.log("change", Vue.prototype.$lang)
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", Arial, Verdana, sans-serif;
}
.oswald {
  font-family: "Oswald", Arial, sans-serif !important;
}
.primary-color {
  color: #5e1b2d !important;
}
</style>
