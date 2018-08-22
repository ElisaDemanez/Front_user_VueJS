<template>
  <div class="hello">
    <v-btn color='pink darken-4' class='white--text oswald-title' > <v-icon color='white'>search</v-icon> Voir plus</v-btn>
    <span style="display:none;">{{$root.lang}}</span>
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
      points: null
    };
  },
  mounted() {
    //  create custom method for filter on object
    var self = this;
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    this.initMap();
    this.getPoints().then(function() {
      self.displayParentMarkers();
    });
  },
  updated() {
    this.resetMarkers();
    this.displayParentMarkers();
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
    },
    displayParentMarkers() {
      var self = this;
      for (const key in self.points) {
        if (self.points.hasOwnProperty(key)) {
          const element = self.points[key];
          console.log(JSON.parse(JSON.stringify(element)), key);
          if (element.type == "parent") {
            var marker = L.marker([element.latitude, element.longitude]);
            marker.addTo(self.map);

            marker.bindPopup(
              "<b>" +
                this.filteredName(element) +
                "</b><br>" +
                this.filteredDescription(element) +
                "  <br> <button type='button' class='white--text oswald-title v-btn pink darken-4 display-children ' data-key='" +
                key +
                "'><div class='v-btn__content'><i aria-hidden='true' class='v-icon white--text material-icons'>search</i> Voir plus</div></button>"
            );
            marker.addEventListener("click", function(yey) {
              var classname = document.getElementsByClassName(
                "display-children"
              );
              var button = classname[classname.length - 1];

              button.addEventListener("click", function(yo) {
                var targetID = yo.target.dataset.key;
                console.log(targetID);
                var childrenToDisplay = self.points[targetID].children;
                if (childrenToDisplay.length > 0) {
                  self.displayChildrenMarkers(childrenToDisplay);
                }
              });
            });
          }
        }
      }
    },
    displayChildrenMarkers(children) {
      var self = this;
      this.resetMarkers();
      var markerArray = [];
      for (const key in children) {
        if (children.hasOwnProperty(key)) {
          const element = children[key];
          console.log(JSON.parse(JSON.stringify(element)), key);
          var marker = L.marker([element.latitude, element.longitude]);
          marker.addTo(self.map);

          marker.bindPopup(
            "<b>" +
              self.filteredName(element) +
              "</b><br>" +
              self.filteredDescription(element)
          );
          markerArray.push(marker);
        }
      }
      var bounds = new L.featureGroup(markerArray);
      console.log(markerArray, bounds.getBounds());
      self.map.fitBounds(bounds.getBounds());
    },
    resetMarkers() {
      var markerLayer = this.map.getPanes()["markerPane"];
      while (markerLayer.firstChild) {
        markerLayer.removeChild(markerLayer.firstChild);
      }
      this.map.closePopup();
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
