<template>
    <div class="">

        <v-toolbar dense>
            <v-toolbar-title class="oswald font-weight-bold">OTVLV - Administration de la carte</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn flat class="oswald font-weight-bold" :to="{name:'AdminPoints'}">
                    Points
                </v-btn>

                <a v-if="$root.connected" @click="logout" style="margin-top: 20px;margin-left: 24px;">Se déconnecter</a>

            </v-toolbar-items>


        </v-toolbar>
    </div>
</template>

<script>

export default {
  name: "Navbar",
  data: () => ({}),
  methods: {
    logout() {
      var confirmation = confirm("Se déconnecter ? ");
      if (confirmation) {
        this.$root.connected = false;
        localStorage.setItem('admin_mode', false); 
        this.$router.push({ name: "MapPage" });
      }
    }
  }
};
</script>

<style scoped>
</style>
