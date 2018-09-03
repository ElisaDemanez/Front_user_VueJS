<template>
    <div class="">

        <v-toolbar dense>
            <v-toolbar-title class="oswald font-weight-bold">OTVLV - Administration de la carte</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn flat class="oswald font-weight-bold" :to="{name:'AdminPoints'}">
                    Points
                </v-btn>

                <!-- <v-btn flat class="oswald font-weight-bold" :to="{name:''}">
                    Parcours
                </v-btn> -->
            </v-toolbar-items>


        </v-toolbar>
    </div>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({})
};
</script>

<style scoped>
</style>
