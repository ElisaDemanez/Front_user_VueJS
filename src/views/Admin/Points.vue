<template>
  <div class="">
    <Navbar/>
 <v-list two-line>
          <template v-for="(item) in points">
        {{item.name}}
        <!-- <v-subheader
              v-if="item.name.fr"
              :key="item.name.fr"
            >
              {{ item.name.fr }}
            </v-subheader> -->
          </template>
        </v-list>
  </div>
</template>

<script>
import Navbar from "@/components/Admin/Navbar";
import MainService from "@/services/MainService";

export default {
  name: "Points",
  components: {
    Navbar
  },
  data() {
    return {
      points: null
    };
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
    }
  },
  created: function() {
    this.getPoints();
  }
};
</script>

<style scoped>
</style>
