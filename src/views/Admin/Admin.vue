<template>
  <div class="hello">
 <!-- <button @click="submit()">oyoy</button> -->
  </div>
</template>

<script>
import MainService from "@/services/MainService";

export default {
  name: "Admin",
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
