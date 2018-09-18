<template>
  <div >
 <Navbar/>
  <v-content>
    <v-card>

      <v-card-text>
        <p class="text-xs-left text-lg-center"> {{text[$root.lang].information_placeholder}} </p>
      </v-card-text>
    </v-card>

  </v-content>
  </div>
</template>

<script>
import Navbar from "@/components/User/Navbar";
import text from "@/translations/main.json";

export default {
  name: "Informations",
  components: {
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
