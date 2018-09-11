<template>
  <div class="">
    <Navbar />
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-layout row>
          <v-flex xs10>
            <h2 class="headline oswald font-weight-bold">
              Les Points
            </h2>
          </v-flex>
          <v-flex xs2>
            <v-menu offset-y>
              <v-btn fab dark color="pink darken-4" slot="activator">
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile :to="{name:'AdminPoint', params:{type : 'parent'}}">
                  <v-list-tile-title> Village</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name:'AdminPoint', params:{type : 'children'}}">
                  <v-list-tile-title  > Détail</v-list-tile-title>
                </v-list-tile>
                 <v-list-tile :to="{name:'AdminPoint', params:{type : 'office'}}">
                  <v-list-tile-title  > Office</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>

        <v-card>
          <v-list two-line>
              <v-progress-circular v-if="loading" indeterminate>
              </v-progress-circular>
            <template v-else v-for="(item, index) in points">
              <!-- {{item}} -->
              <v-list-tile :key="index" avatar>
                <!-- <v-list-tile-avatar>
                                  <img :src="item.avatar">
                              </v-list-tile-avatar> -->

                <v-list-tile-content :key="item.id">
                  <v-list-tile-title v-for="name in item.name" v-if="name.langCode=='fr'" :key="name.nametext">
                    {{name.nametext }}</v-list-tile-title>
                  <v-list-tile-sub-title v-for="description in item.description" v-if="description.langCode=='fr'" :key="description.descriptiontext">
                    {{description.descriptionText }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon :to="{name:'AdminPointUpdate', params:{ type : item.type, id:item.id}}">
                    <v-icon>edit</v-icon>
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
      points: null,
      loading: true
    };
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
    }
  },
  created: function() {
    var self = this;
    this.getPoints().then(function() {
      self.loading = false;
    });
  }
};
</script>

<style scoped>
</style>
