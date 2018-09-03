<template>
  <div class="hello">
    <Navbar/>
 <!-- <button @click="submit()">oyoy</button> -->
  </div>
</template>

<script>
import MainService from "@/services/MainService";
import Navbar from "@/components/Admin/Navbar";

export default {
  name: "Admin",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    submit() {
      const params = {
        langCode: "fr",
        descriptionText: "yoyoyoy",
        fkPoint: "/api/points/19"
      };
      MainService.postDescription(params);
      console.log("yo");
    }
  }
};
</script>

<style scoped>
</style>
