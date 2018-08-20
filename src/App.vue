<template>
    <div id="app">

        <v-toolbar dense>
            <v-toolbar-title class="oswald font-weight-bold">{{title[$root.lang]}}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon class="hidden-sm-and-up" :to="{name:'MapPage'}">
                <v-icon class="primary-color">place</v-icon>
            </v-btn>

            <v-btn icon class="hidden-sm-and-up" :to="{name:'Informations'}">
                <v-icon class="primary-color">info</v-icon>

            </v-btn>

            <v-btn flat class="hidden-xs-only primary-color" :to="{name:'MapPage'}">
                <v-icon>place</v-icon>
                {{map[$root.lang]}}
            </v-btn>

            <v-btn flat class="hidden-xs-only primary-color" :to="{name:'Informations'}">
                <v-icon>info</v-icon>
             {{informations[$root.lang]}}
            </v-btn>
            <select name="yoyo" id="" v-model="$root.lang" >
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
    title: { fr: "titre", nl: "nltitle", en: "title" },
    map: { fr: "carte", nl: "nlmap", en: "map" },
    informations: {
      fr: "informations",
      nl: "nlinformations",
      en: "eninformations"
    }
  }),
  created() {},
  watch: {}
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
