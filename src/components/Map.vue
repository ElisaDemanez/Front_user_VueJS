<template>
  <div class="hello">
    {{$root.lang}}
    <div id="map">
    </div>
  </div>
</template>

<script>
import MainService from "@/services/MainService";
import "leaflet";
import Vue from "vue";

const L = window.L;
export default {
  name: "Map",
  data() {
    return {
      map: [],
      points: null,
      lang: this.$root.lang
    };
  },
  created() {},
  mounted() {
    //  create custom method for filter on object
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    this.initMap();
    var self = this;
    this.getPoints().then(function() {
      for (const key in self.points) {
        if (self.points.hasOwnProperty(key)) {
          const element = self.points[key];
          var marker = L.marker([element.latitude, element.longitude]);
          marker.addTo(self.map);

          marker.bindPopup(
            "<b>" +
              self.filteredName(element) +
              "</b><br>" +
              self.filteredDescription(element)
          );
        }
      }
    });
  },
  updated() {
    var self = this;
    self.map.closePopup();
    //  create custom method for filter on object, used in methods filteredXXX

    for (const key in self.points) {
      if (self.points.hasOwnProperty(key)) {
        const element = self.points[key];
        var marker = L.marker([element.latitude, element.longitude]);
        marker.addTo(self.map);

        marker.bindPopup(
          "<b>" +
            self.filteredName(element) +
            "</b><br>" +
            self.filteredDescription(element)
        );
      }
    }
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
    },

    initMap() {
      const map = L.map("map").setView([44.4986865, 1.1861205], 14);
      L.tileLayer(
        "https://{s}.tiles.mapbox.com/v4/{user}.{mapId}/{z}/{x}/{y}.png?access_token={token}",
        {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          mapId: "i81oam9h",
          user: "skycatch-dev",
          token:
            "pk.eyJ1Ijoic2t5Y2F0Y2gtZGV2IiwiYSI6Ik1PVjVYNEkifQ.j2X9OOZDz7ABqUvHk4kesw"
        }
      ).addTo(map);
      this.map = map;
    },
    filteredName(element) {
      var filteredName = Object.filter(
        element.name,
        name => name.langCode == this.$root.lang
      );
      // get the name of the 1st element or set empty name
      return (filteredName = filteredName[Object.keys(filteredName)[0]]
        ? filteredName[Object.keys(filteredName)[0]].name
        : "");
    },
    filteredDescription(element) {
      var filteredName = Object.filter(
        element.description,
        description => description.langCode == this.$root.lang
      );
      // get the name of the 1st element or set empty name
      return (filteredName = filteredName[Object.keys(filteredName)[0]]
        ? filteredName[Object.keys(filteredName)[0]].description
        : "");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
