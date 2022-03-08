<template>
  <v-navigation-drawer
    app
    clipped
    right
    permanent
    v-model="drawer"
    :mini-variant.sync="mini"
  >
    <v-list class="mx-2 pa-2 fill-height">
      <v-list-item class="pa-0 ma-0">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon v-if="mini">mdi-arrow-collapse-left</v-icon>
          <v-icon v-if="!mini">mdi-arrow-collapse-right</v-icon>
        </v-btn>
        <h2 v-if="!mini" class="ml-3">Details</h2>
      </v-list-item>
      <v-divider></v-divider>
      <ChapterDetails
        v-if="currentTabObject.type === entityType.CHAPTER && !mini"
      />
      <MasternoteDetails
        v-if="currentTabObject.type === entityType.MASTERNOTE && !mini"
      />
      <CharacterDetails
        v-if="currentTabObject.type === entityType.CHARACTER && !mini"
      />
      <LocationDetails
        v-if="currentTabObject.type === entityType.LOCATION && !mini"
      />
      <ItemDetails v-if="currentTabObject.type === entityType.ITEM && !mini" />
      <EnemyDetails
        v-if="currentTabObject.type === entityType.ENEMY && !mini"
      />
    </v-list>
    <template v-slot:append>
      <v-row class="d-flex justify-center mb-3 pa-2">
        <v-spacer />
        <v-btn
          v-if="currentTabObject && currentTabObject.id && !mini"
          color="error"
          text
          class="mr-4"
          @click="removeEntity()"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapMutations, mapGetters } from "vuex";
  import ChapterDetails from "@/components/pages/workshop/details/ChapterDetails";
  import MasternoteDetails from "@/components/pages/workshop/details/MasternoteDetails";
  import CharacterDetails from "@/components/pages/workshop/details/CharacterDetails";
  import LocationDetails from "@/components/pages/workshop/details/LocationDetails";
  import ItemDetails from "@/components/pages/workshop/details/ItemDetails";
  import EnemyDetails from "@/components/pages/workshop/details/EnemyDetails";

  export default {
    components: {
      ChapterDetails,
      MasternoteDetails,
      CharacterDetails,
      LocationDetails,
      ItemDetails,
      EnemyDetails,
    },
    data: () => ({
      drawer: true,
      mini: false,
    }),
    computed: {
      ...mapGetters({
        currentTab: "tab/getCurrentTab",
        currentTabObject: "tab/getCurrentTabObject",
        entityType: "adventureData/getEntityType",
      }),
    },
    methods: {
      removeEntity() {
        switch (this.currentTabObject.type) {
          case this.entityType.CHAPTER:
            this.removeChapter(this.currentTabObject.id);
            break;
          case this.entityType.MASTERNOTE:
            this.removeMasternote(this.currentTabObject.id);
            break;
          case this.entityType.CHARACTER:
            this.removeCharacter(this.currentTabObject.id);
            break;
          case this.entityType.LOCATION:
            this.removeLocation(this.currentTabObject.id);
            break;
          case this.entityType.ITEM:
            this.removeItem(this.currentTabObject.id);
            break;
          case this.entityType.ENEMY:
            this.removeEnemy(this.currentTabObject.id);
            break;
          default:
            break;
        }
        this.$store.dispatch("tab/closeTab", this.currentTab);
      },
      ...mapMutations("adventureData", [
        "removeChapter",
        "removeMasternote",
        "removeCharacter",
        "removeLocation",
        "removeItem",
        "removeEnemy",
      ]),
    },
  };
</script>

<style></style>
