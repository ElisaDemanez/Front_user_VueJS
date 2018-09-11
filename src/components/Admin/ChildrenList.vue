
        <template>
  <v-card>
    <span style="display:none;">{{selected}} {{truc}}</span>
          <v-list two-line>
            <template  v-for="(item, index) in points">
              <v-list-tile :key="index" avatar>
                  <v-checkbox v-model="selected" :value="item.id"></v-checkbox>
                <!-- <v-list-tile-avatar>
                                  <img :src="item.avatar">
                              </v-list-tile-avatar> -->

                <v-list-tile-content :key="item.id">
                  <v-list-tile-title v-for="name in item.name" v-if="name.langCode=='fr'" :key="name.nametext">
                    {{name.nametext}}</v-list-tile-title>
                  <v-list-tile-sub-title v-for="description in item.description" v-if="description.langCode=='fr'" :key="description.descriptiontext">
                    {{description.descriptionText }}</v-list-tile-sub-title>
                </v-list-tile-content>
               
              </v-list-tile>
              <v-divider :key="item.latitude+item.longitude"></v-divider>
            </template>
          </v-list>
        </v-card>
</template>

<script>
import MainService from "@/services/MainService";

export default {
  name: "ChildrenList",
  data() {
    return {
      selected: [],
      points: []
    };
  },
  props: {
    childrenArray: Array,
    truc: Boolean
  },
  watch: {
    selected: function(newVal, oldVal) {
      this.$emit("selected", newVal);
    }
  },
  mounted() {
    var self = this;
    this.getChildren().then(function() {
      self.selected = self.childrenArray;
    });
  },
  updated() {
    this.selected = this.childrenArray;
  },
  methods: {
    async getChildren() {
      const response = await MainService.fetchPointsOnType("children");
      this.points = response.data;
    }
  }
};
</script>

<style scoped>
</style>
