<template>
    <div class="">

        <v-toolbar dense>
            <v-toolbar-title class="oswald font-weight-bold">{{text[$root.lang].navbar_title}}</v-toolbar-title>

            <v-spacer></v-spacer>
             <v-toolbar-items >
            <v-tabs v-model="active" show-arrows  slider-color="pink darken-4" >

                <v-tab ripple @click="redirect('MapPage')" class="tabs_overwrite oswald font-weight-bold" >
                    <v-icon>place</v-icon>
                    <span class="hidden-xs-only "> {{text[$root.lang].navbar_link_map}}</span>
                </v-tab>
                <v-tab ripple @click="redirect('Informations')" class="tabs_overwrite oswald font-weight-bold" >
                    <v-icon>info</v-icon>
                    <span class="hidden-xs-only"> {{text[$root.lang].navbar_link_info}}</span>
                </v-tab>

            </v-tabs>
          </v-toolbar-items>

            <select name="" id="" v-model="$root.lang"> 
                <option v-for="item in items" :key="item">{{item}}</option>
            </select>

        </v-toolbar>
    </div>
</template>

<script>
import text from "@/translations/main.json";

export default {
  name: "Navbar",
  data: () => ({
    items: ["fr", "en", "nl"],
    text: text,
    active: null
  }),
  created() {
    if (this.$route.name == "MapPage") this.active = 0;
    if (this.$route.name == "Informations") this.active = 1;
  },
  methods: {
    redirect(routeName) {
      this.$router.push({ name: routeName });
    }
  }
};
</script>

<style scoped>
.tabs_overwrite {
  background-color: #f5f5f5;
  text-transform: none;

}
</style>
