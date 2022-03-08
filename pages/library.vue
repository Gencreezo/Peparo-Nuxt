<template>
  <v-container fluid class="align-self-start">
    <p class="headline">
      Adventures
      <v-btn
        class="mx-2"
        color="primary"
        dark
        @click.stop="showAdventureDialog = true"
      >
        <v-icon left>mdi-plus</v-icon>Create Adventure
      </v-btn>
      <AdventureDialog
        :show="showAdventureDialog"
        :adventureId="adventureId"
        :editAdv="edit"
        @close="closeDialog"
      />
    </p>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row dense class="mw-300">
        <v-col
          v-for="(adv, index) in adventures"
          :key="adv.data.title + index"
          cols="6"
          xs="6"
          sm="4"
          md="3"
          lg="2"
        >
          <AdventureCard
            :adventure="adv"
            :id="adv.id"
            @editAdv="editAdventure"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  import AdventureCard from "@/components/pages/library/AdventureCard";
  import AdventureDialog from "@/components/shared/dialogs/AdventureDialog";
  import { mapActions } from "vuex";

  export default {
    head() {
      return { title: "Library" };
    },
    components: {
      AdventureCard,
      AdventureDialog,
    },
    data: () => ({
      showAdventureDialog: false,
      adventureId: undefined,
      edit: false,
    }),
    computed: {
      adventures() {
        return this.$store.state.adventure.adventures;
      },
    },
    async mounted() {
      await this.readAdventures().catch((err) => {
        this.$nuxt.$emit("alert-error", err.message);
        this.$router.push("/");
      });
    },
    methods: {
      ...mapActions("adventure", ["readAdventures"]),
      editAdventure(adventureId) {
        this.edit = true;
        this.adventureId = adventureId;
        this.showAdventureDialog = true;
      },
      closeDialog() {
        this.showAdventureDialog = false;
        this.adventureId = undefined;
        this.edit = false;
      },
    },
  };
</script>

<style>
  .mw-300 {
    min-width: 300px;
  }
</style>
