<template>
  <v-container id="reader" v-if="!loading" class="fill-height pa-0 ma-0">
    <MenuDrawer />
    <Reader />
    <NotesDrawer />
  </v-container>
</template>

<script>
  import MenuDrawer from "@/components/pages/reader/MenuDrawer.vue";
  import Reader from "@/components/pages/reader/Reader.vue";
  import NotesDrawer from "@/components/pages/reader/NotesDrawer.vue";
  import { mapGetters, mapActions, mapMutations } from "vuex";
  export default {
    head() {
      return { title: "Reader" };
    },
    components: {
      MenuDrawer,
      Reader,
      NotesDrawer,
    },
    data: () => ({
      loading: true,
    }),
    computed: {
      id() {
        return this.$route.params.id;
      },
      ...mapGetters({
        getAdvById: "adventure/getAdvById",
      }),
    },
    async mounted() {
      let adv = this.getAdvById(this.id);
      if (adv === undefined) {
        adv = await this.readAdventure(this.id).catch((err) => {
          this.$nuxt.$emit("alert-error", err.message);
          this.$router.push("/library");
        });
      }
      await this.readAdventureDataByID(adv?.data?.advDataId).catch((err) => {
        this.$nuxt.$emit("alert-error", err.message);
        this.$router.push("/library");
      });
      this.loading = false;
    },
    beforeDestroy() {
      this.removeAdventureData();
      this.removeAdventures();
    },
    methods: {
      ...mapMutations("adventureData", ["removeAdventureData"]),
      ...mapMutations("adventure", ["removeAdventures"]),
      ...mapActions("adventureData", ["readAdventureDataByID"]),
      ...mapActions("adventure", ["readAdventure"]),
    },
  };
</script>

<style>
  #workshop {
    min-width: -webkit-fill-available;
  }
  .container.fill-height > .row {
    flex: 1 1 100%;
    max-width: calc(100%);
  }
</style>
