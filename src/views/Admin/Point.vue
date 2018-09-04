<template>
    <div class="">
        <Navbar />
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                {{point}}
                <h2 class="headline oswald font-weight-bold" v-if="point">
                    Modification du point
                </h2>
                <h2 class="headline oswald font-weight-bold" v-else>
                    Nouveau point
                </h2>


                 <v-form v-model="valid">
                    <v-text-field
                    v-model="point.name_fr"
                    :counter="50"
                    label="Titre"
                    required
                    ></v-text-field>
                    <!-- :rules="titreRules" -->
      
                </v-form>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Navbar from "@/components/Admin/Navbar";
import MainService from "@/services/MainService";

export default {
  name: "Point",
  components: {
    Navbar
  },
  data() {
    return {
      point: {
        id: null,
        name_fr: null,
        name_en: null,
        name_nl: null
      },
      valid: false
    };
  },
  methods: {
    async getPoint() {
      const response = await MainService.fetchPoint(this.$route.params.id);
      this.point = response.data;
      //   console.log("getpoint")
    }
  },
  created: function() {
    const self = this;
    if (this.$route.params.id) {
      this.getPoint().then(function() {
        // console.log("1erthen")
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
        console.log(self.point);
      });
    }
  }
};
</script>

<style scoped>
</style>


