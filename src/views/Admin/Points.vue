<template>
    <div class="">
        <Navbar />
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-list two-line>
                        <template v-for="(item, index) in points">
                            <v-list-tile :key="index" avatar >
                            <!-- {{item}} ici -->
                                <!-- <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar> -->
                              
                                <v-list-tile-content :key="item.id">
                                    <v-list-tile-title v-for="name in item.name" v-if="name.langCode=='string'" :key="name.nametext">
                                        {{name.nametext }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-for="description in item.description" v-if="description.langCode=='string'"
                                        :key="description.descriptiontext"> {{description.descriptionText }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                 <v-list-tile-action>
                                     <v-btn icon :to="{name:'AdminPointUpdate', params:{ id:item.id}}" >
                                        <v-icon >edit</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider :key="item.latitude+item.longitude"></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
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
