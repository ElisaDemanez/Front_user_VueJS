<template>
  <div id="bbonjour">
    <Navbar />
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="headline oswald font-weight-bold" v-if="this.$route.params.id">
          Modification du point
        </h2>
        <h2 class="headline oswald font-weight-bold" v-else>
          Nouveau point
        </h2>
            <v-flex xs12  offset-xs9 v-if="this.$route.params.id">
              <v-btn color="error" @click="deletePointMethod"><v-icon light>delete</v-icon> Supprimer  </v-btn>
            </v-flex>
        <v-form v-model="valid">
          <v-text-field v-model="point.name_fr" :counter="50" label="Titre" required></v-text-field>
          <v-text-field v-model="point.description_fr" label="Description" required></v-text-field>

          <div id="map">
          </div>
          <v-layout row>
            <v-flex xs12 sm10>
              <v-text-field v-model="point.latitude" label="Latitude" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm10 offset-sm2>

              <v-text-field v-model="point.longitude" label="Longitude" required></v-text-field>

            </v-flex>

          </v-layout>
          <v-text-field v-model="point.name_en" :counter="50" label="Titre anglais" ></v-text-field>
          <v-text-field v-model="point.description_en" label="Description anglaise" ></v-text-field>
          <v-text-field v-model="point.name_nl" :counter="50" label="Titre néerlandais" ></v-text-field>
          <v-text-field v-model="point.description_nl" label="Description néerlandaise" ></v-text-field>
           
            <div v-if=" this.$route.params.type == 'parent'" >
                <h4 class="oswald font-weight-bold">
                   Points enfants
                 </h4>

              <ChildrenList :childrenArray="childrenArray" :truc="childListUpdate" @selected="updateSelected"/>
            </div>          


            <v-flex xs12 offset-xs5 class="mt-4">
                       
            <v-btn color="pink darken-4" dark class=" font-weight-bold" :disabled="!valid" @click="submit">
            Valider
            </v-btn>
            </v-flex>

        </v-form>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Navbar from "@/components/Admin/Navbar";
import checkAuth from "@/components/Admin/checkAuth";
import ChildrenList from "@/components/Admin/ChildrenList";
import MainService from "@/services/MainService";
import "leaflet";
const L = window.L;

export default {
  name: "Point",
  mixins: [checkAuth],

  components: {
    Navbar,
    ChildrenList
  },
  data() {
    return {
      point: {
        map: [],
        id: null,
        latitude: 44.4986865,
        longitude: 1.1861205,
        name_fr: null,
        name_en: null,
        name_nl: null,
        description_fr: null,
        description_en: null,
        description_nl: null
      },
      valid: false,
      childrenArray: [],
      childListUpdate: false,
      marker: null
    };
  },
  watch: {
    point: {
      handler: function(after, before) {
        var self = this;
        var newLatLng = new L.LatLng(
          parseFloat(self.point.latitude),
          parseFloat(self.point.longitude)
        );
        this.marker.setLatLng(newLatLng);
      },
      deep: true
    },
    childrenArray: function(after) {
      this.childListUpdate = true;
    }
  },
  mounted: function() {
    const self = this;
    // if update
    if (this.$route.params.id) {
      this.getPoint().then(function() {
        // in template cannot acces element.name[lang], so this neeeded.
        for (const key in self.point.name) {
          if (self.point.name.hasOwnProperty(key)) {
            const element = self.point.name[key];
            switch (element.langCode) {
              case "fr":
                self.point.name_fr = element.nametext;
                break;
              case "en":
                self.point.name_en = element.nametext;
                break;
              case "nl":
                self.point.name_nl = element.nametext;
                break;
            }
          }
        }
        for (const key in self.point.description) {
          if (self.point.description.hasOwnProperty(key)) {
            const element = self.point.description[key];
            switch (element.langCode) {
              case "fr":
                self.point.description_fr = element.descriptionText;
                break;
              case "en":
                self.point.description_en = element.descriptionText;
                break;
              case "nl":
                self.point.description_nl = element.descriptionText;
                break;
            }
          }
        }
        self.childrenArray = [];
        for (const key in self.point.children) {
          if (self.point.children.hasOwnProperty(key)) {
            const element = self.point.children[key];
            self.childrenArray.push(element.id);
          }
        }
        self.initMap();
        self.initMarker(self.point.latitude, self.point.longitude);
      });
    } else {
      self.initMap();
      self.initMarker(self.point.latitude, self.point.longitude);
    }
  },
  methods: {
    async getPoint() {
      const response = await MainService.fetchPoint(this.$route.params.id);
      this.point = response.data;
    },
    async deletePoint() {
      const response = await MainService.deletePoint(this.$route.params.id);
      return response;
    },

    initMap() {
      var self = this;
      var map = L.map("map").setView([44.4986865, 1.1861205], 14);

      L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
      }).addTo(map);
      this.map = map;
    },
    initMarker(lat, long) {
      var self = this;
      this.marker = L.marker([lat, long], {
        draggable: true
      });
      this.marker.addTo(self.map);
      this.marker.on("move", function() {
        self.point.latitude = self.marker["_latlng"].lat;
        self.point.longitude = self.marker["_latlng"].lng;
      });
    },
    updateSelected(params) {
      this.childrenArray = params;
      this.childListUpdate = true;
      this.childListUpdate = false;
    },
    submit() {
      if (this.childrenArray) {
        this.childrenArray.forEach((element, index) => {
          this.childrenArray[index] = "/api/points/" + element;
        });
      }
      const params = {
        type: this.$route.params.type,
        latitude: this.point.latitude,
        longitude: this.point.longitude,
        name: [
          {
            nametext: this.point.name_fr,
            langCode: "fr"
          },
          {
            nametext: this.point.name_en,
            langCode: "en"
          },
          {
            nametext: this.point.name_nl,
            langCode: "nl"
          }
        ],
        description: [
          {
            langCode: "fr",
            descriptionText: this.point.description_fr
          },
          {
            langCode: "en",
            descriptionText: this.point.description_en
          },
          {
            langCode: "nl",
            descriptionText: this.point.description_nl
          }
        ],
        children: this.childrenArray
      };
      console.log(params);
      if (this.$route.params.id) {
        MainService.putPoint(this.point.id, params);
      } else {
        MainService.postPoint(params);
      }
      this.$router.push({ name: "AdminPoints" });
    },
    deletePointMethod() {
      var self = this;
      var confirmation = confirm(
        'Etes vous sur de vouloir supprimer le point " ' +
          this.point.name_fr +
          ' " ? '
      );
      if (confirmation) {
        self
          .deletePoint()
          .then(function(params) {
            self.$router.push({ name: "AdminPoints" });
          })
          .catch(function(error) {
            console.log(error, "error");
            alert(
              "Impossible de supprimer le point. Vérifiez qu'il n'ai plus de points enfants. "
            );
          });
      }
    }
  }
};
</script>

<style scoped>
#map {
  width: 650px;
  height: 400px;
}
</style>


