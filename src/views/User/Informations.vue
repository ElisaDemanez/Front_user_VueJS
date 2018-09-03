<template>
  <div >
 <Navbar/>
  <v-content>
    <v-card>

      <v-card-text>
        <p class="text-xs-left text-lg-center">Infos.</p>
      </v-card-text>
    </v-card>

  </v-content>
  </div>
</template>

<script>
import Navbar from "@/components/User/Navbar";

export default {
  name: "Informations",
  components: {
    Navbar
  }
};
</script>

<style>
</style>
