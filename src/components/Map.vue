<template>
  <div class="hello">
    <div id="map">
    </div>
  </div>
</template>

<script>
import MainService from "@/services/MainService";
import "leaflet";

const L = window.L;
export default {
  name: "Map",
  data() {
    return {
      map: [],
      points: null
    };
  },
  mounted() {
    this.initMap();
    var self = this;
    this.getPoints().then(function() {
      console.log("there", self.points);
      for (const key in self.points) {
      if (self.points.hasOwnProperty(key)) {
        const element = self.points[key];
         L.marker([element.latitude,element.longitude]).addTo(self.map)
      }
    }
    });
    
   
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
      console.log("here");
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
