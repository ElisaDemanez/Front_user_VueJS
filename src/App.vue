<template>
    <div id="app">
        <v-app>
          <router-view></router-view>
        </v-app>
    </div>
</template>

<script>
import Vue from "vue";


export default {
  name: "App",
  data: () => ({
  }),
};
</script>

<style>
#app {
  font-family: "Roboto", Arial, Verdana, sans-serif;
}
.oswald {
  font-family: "Oswald", Arial, sans-serif !important;
}
.primary-color {
  color: #5e1b2d !important;
}
.oswald-title {
  font-family: "Oswald", Arial, sans-serif !important;
  font-weight: bold !important;
  text-transform: none !important;
  letter-spacing: 1px !important;
}

.custom-icon {
  background-color: white;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  line-height: 30px;
}

.easy-button-button {
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 2px;
}

.easy-button-button:hover {
  background: #f4f4f4;
}

.leaflet-popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
