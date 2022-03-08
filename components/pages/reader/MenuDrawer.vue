<template>
  <MenuDrawerTemplate
    :adventureId="adventureId"
    @selectEntity="selectEntity"
    @saveAndExit="saveAndExit"
  />
</template>

<script>
  import MenuDrawerTemplate from "~/components/shared/templates/MenuDrawerTemplate.vue";
  import { mapMutations, mapActions } from "vuex";

  export default {
    components: {
      MenuDrawerTemplate,
    },
    data() {
      return {};
    },
    computed: {
      adventureId() {
        return this.$route.params.id;
      },
    },
    methods: {
      async selectEntity({ entity, type }) {
        //TODO: Store für currentReaderPage oderso
        await this.readContentById(entity.contentId);
        this.setCurrentPage(entity);
      },
      async saveAndExit() {
        try {
          // TODO: save current adventure progress with notes etc.. #138
          // await this.updateAdventureData(); <- replace this savefunction from workshop
          this.$nuxt.$emit("alert-success", "Saving complete");
          this.$router.push("/library");
        } catch (error) {
          this.$nuxt.$emit("alert-error", error.message);
        }
      },
      ...mapMutations("reader", ["setCurrentPage"]),
      ...mapActions("adventureData", ["readContentById"]),
    },
  };
</script>

<style></style>
