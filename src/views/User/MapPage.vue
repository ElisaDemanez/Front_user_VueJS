<template>
<div>
  <Navbar/>
  <v-content>
    <v-card>

      <v-card-text>
        <p class="text-xs-left text-lg-center">{{text[$root.lang].map_description}}</p>
      </v-card-text>
    </v-card>

  <Map/>
  </v-content>
</div>
</template>

<script>
import Map from "@/components/User/Map";
import Navbar from "@/components/User/Navbar";
import text from "@/translations/main.json";

export default {
  name: "MapPage",
  components: {
    Map,
    Navbar
  },
  data() {
    return {
      text: text
    };
  }
};
</script>

<style>
</style>
