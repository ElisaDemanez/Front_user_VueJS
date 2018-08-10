<template>
  <div class="hello">
 
  </div>
</template>

<script>
import MainService from "@/services/MainService";
import 'leaflet'
export default {
  name: "Map",
  data() {
    return {
    };
  },
  mounted() {
    this.getLambs();
  },
  methods: {
    async getLambs() {
      const response = await MainService.fetchPoints();
      console.log(response.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
