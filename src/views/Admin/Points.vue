<template>
  <div class="">
    <Navbar />
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-layout row class="mt-5">
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
                  <v-list-tile-title> Détail</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name:'AdminPoint', params:{type : 'office'}}">
                  <v-list-tile-title> Office</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-tabs fixed-tabs v-if="!loading" v-model="active">
          <v-tab v-for="n in categories" :key="n.name" @click="refreshFilter(n.category)">
            {{ n.name }}
          </v-tab>
        </v-tabs>
        <v-card>
          <v-list two-line>
            <v-container v-if="loading" fill-height>
              <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                  <v-progress-circular indeterminate>
                  </v-progress-circular>
                </v-flex>
              </v-layout>
            </v-container>

            <template v-else v-for="(item, index) in filteredPoints">
              <v-list-tile :key="'tile-'+index">
                <!-- avatar -->
                <!-- <v-list-tile-avatar>
                                    <img :src="item.avatar">
                                </v-list-tile-avatar> -->
                <v-list-tile-content :key="'content-'+item.id">
                  <v-list-tile-title v-for="name in item.name" v-if="name.langCode=='fr'" :key="name.nametext">
                    {{name.nametext }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-for="description in item.description" v-if="description.langCode=='fr'" :key="description.descriptiontext">
                    {{description.descriptionText }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon :to="{name:'AdminPointUpdate', params:{ type : item.type, id:item.id}}">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key=" 'divider-'+ index + item.latitude + item.longitude"></v-divider>
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
import checkAuth from "@/components/Admin/checkAuth";

export default {
  name: "Points",
  mixins: [checkAuth],

  components: {
    Navbar
  },
  data() {
    return {
      points: null,
      filteredPoints: null,
      loading: true,
      categories: [
        { name: "Tous", category: "all" },
        { name: "Villages", category: "parent" },
        { name: "Détails", category: "children" },
        { name: "Offices", category: "office" }
      ],
      active: null
    };
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
      this.filteredPoints = response.data;
    },
    refreshFilter(category) {
      let self = this;
      //  you cant use computed stuff when depending on async stuff
      if (category == "all") this.filteredPoints = this.points;
      else {
        self.filteredPoints = [];
        let filteredIndexes = Object.keys(this.points).filter(function(index) {
          var type = self.points[index].type;
          return type == category;
        });
        for (const key in self.points) {
          if (self.points.hasOwnProperty(key)) {
            const element = self.points[key];
            if (filteredIndexes.includes(key)) {
              self.filteredPoints.push(element);
            }
          }
        }
      }
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
