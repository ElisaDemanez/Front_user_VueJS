<template>
  <div class="hello">
    <!-- needed for refresh -->
      <span style="display:none;">{{$root.lang}}</span>
    <div id="map">
    </div>
       
  </div>
</template>

<script>
import MainService from "@/services/MainService";
import officeIcn from "@/assets/office-de-tourisme.png";
import "leaflet";
import "leaflet-easybutton";

const L = window.L;
export default {
  name: "Map",
  data() {
    return {
      map: [],
      points: null,
      detailMode: null,
      officesMarkers: [],
      officeIcon: L.icon({
        iconUrl: officeIcn,

        iconSize: [45, 45],
        iconAnchor: [22, 94],
        popupAnchor: [0, -80]
      }),
      buttonText: {
        fr: "Voir plus",
        en: "See more",
        nl: "Zie meer"
      }
    };
  },
  mounted() {
    var self = this;
    //  create custom method for filter on object
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    this.initMap();
    this.getPoints().then(function() {
      self.displayParentMarkers();

      // filter offices markers
      self.officesMarkers = Object.filter(
        self.points,
        element => element.type == "office"
      );
      self.displayOfficesMarkers();
    });
  },
  updated() {
    this.resetMarkers();
    this.displayParentMarkers();
    this.displayOfficesMarkers();
    this.detailMode = false;
  },
  methods: {
    async getPoints() {
      const response = await MainService.fetchPoints();
      this.points = response.data;
    },

    initMap() {
      var self = this;
      // layers
      var sateliteLayer = L.tileLayer(
        "https://{s}.tiles.mapbox.com/v4/{user}.{mapId}/{z}/{x}/{y}.png?access_token={token}",
        {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 17,
          minZoom: 12,
          mapId: "i81oam9h",
          user: "skycatch-dev",
          token:
            "pk.eyJ1Ijoic2t5Y2F0Y2gtZGV2IiwiYSI6Ik1PVjVYNEkifQ.j2X9OOZDz7ABqUvHk4kesw"
        }
      );

      var vectorLayer = L.tileLayer(
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 17,
          minZoom: 12
        }
      );
      const map = L.map("map", {
        center: [44.4986865, 1.1861205],
        zoom: 14,
        layers: [vectorLayer, sateliteLayer]
      });

      var baseMaps = {
        Satellite: vectorLayer,
        Plan: sateliteLayer
      };
      L.control.layers(baseMaps).addTo(map);
      // max bounds
      var southWest = L.latLng(44.450334, 1.033596),
        northEast = L.latLng(44.578653, 1.325752),
        bounds = L.latLngBounds(southWest, northEast);
      map.setMaxBounds(bounds);

      // geolocation
      L.easyButton(
        "<span style='font-size: 30px;line-height: 33px;'>&curren;</span>",
        function(btn, map) {
          map.locate({ setView: true });
        }
      ).addTo(map);

      // if in detail mode and dezoom
      map.on("moveend", function(e) {
        if (map.getZoom() <= 14 && self.detailMode) {
          self.resetMarkers();
          self.displayParentMarkers();
          self.displayOfficesMarkers();

          self.detailMode = false;
        }
      });
      this.map = map;
    },

    displayParentMarkers() {
      var self = this;
      var markerArray = [];

      for (const key in self.points) {
        if (self.points.hasOwnProperty(key)) {
          const element = self.points[key];
          if (element.type == "parent") {
            var marker = L.marker([element.latitude, element.longitude]);
            marker.addTo(self.map);
            var button =
              element.children.length >= 1
                ? `<br> 
                <button type='button' class='white--text oswald-title v-btn pink darken-4 display-children ' data-key=' ${key}'>
                  <div class='v-btn__content'>
                  <i aria-hidden='true' class='v-icon white--text material-icons'>search</i> 
                  ${self.buttonText[self.$root.lang]} 
                  </div>
                </button> `
                : null;

            marker.bindPopup(
              `<b> ${this.filteredName(element)} </b>
                <br> ${this.filteredDescription(element)} 
               ${button}`,
              { maxWidth: 250 }
            );
            markerArray.push(marker);

            // listener on button to display children
            marker.addEventListener("click", function() {
              var classname = document.getElementsByClassName(
                "display-children"
              );
              var button = classname[classname.length - 1];

              button.addEventListener("click", function(e) {
                var targetID = parseInt(e.target.dataset.key);
                var childrenToDisplay = self.points[targetID].children;
                if (childrenToDisplay.length > 0) {
                  self.displayChildrenMarkers(childrenToDisplay);
                }
              });
            });
          }
        }
      }

      // zoom on points
      if (markerArray.length) {
        var bounds = new L.featureGroup(markerArray);
        self.map.fitBounds(bounds.getBounds());
      }
    },

    displayChildrenMarkers(children) {
      this.resetMarkers();
      this.detailMode = true;
      var self = this;
      var markerArray = [];
      for (const key in children) {
        if (children.hasOwnProperty(key)) {
          const element = children[key];

          var marker = L.marker([element.latitude, element.longitude]);
          marker.addTo(self.map);

          marker.bindPopup(
            `<b> ${self.filteredName(element)} </b>
                <br> ${self.filteredDescription(element)}`,
            { maxWidth: 250 }
          );
          markerArray.push(marker);
        }
      }
      // zoom on points
      var bounds = new L.featureGroup(markerArray);
      self.map.fitBounds(bounds.getBounds());
      this.displayOfficesMarkers();
    },

    displayOfficesMarkers() {
      var self = this;

      for (const key in self.officesMarkers) {
        if (self.officesMarkers.hasOwnProperty(key)) {
          const element = self.officesMarkers[key];
          var marker = L.marker([element.latitude, element.longitude], {
            icon: self.officeIcon
          });
          marker.addTo(self.map);

          marker.bindPopup(
            `<b> ${self.filteredName(element)} </b>
                <br> ${self.filteredDescription(element)}`,
            { maxWidth: 250 }
          );
        }
      }
    },

    resetMarkers() {
      var markerLayer = this.map.getPanes()["markerPane"];
      var shadowLayer = this.map.getPanes()["shadowPane"];

      while (markerLayer.firstChild)
        markerLayer.removeChild(markerLayer.firstChild);

      while (shadowLayer.firstChild)
        shadowLayer.removeChild(shadowLayer.firstChild);

      this.map.closePopup();
    },

    filteredName(element) {
      var filteredName = Object.filter(
        element.name,
        name => name.langCode == this.$root.lang
      );
      // get the name of the 1st element or set empty name
      return (filteredName = filteredName[Object.keys(filteredName)[0]]
        ? filteredName[Object.keys(filteredName)[0]].nametext
        : "");
    },
    filteredDescription(element) {
      var filteredDesc = Object.filter(
        element.description,
        description => description.langCode == this.$root.lang
      );
      return (filteredDesc = filteredDesc[Object.keys(filteredDesc)[0]]
        ? filteredDesc[Object.keys(filteredDesc)[0]].descriptionText
        : "");
    }
  }
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
