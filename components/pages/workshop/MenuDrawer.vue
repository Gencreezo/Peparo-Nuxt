<template>
  <MenuDrawerTemplate
    :adventureId="adventureId"
    :withSettingsAndExit="true"
    :withAddButton="true"
    @selectEntity="selectEntity"
    @addEntity="addEntity"
    @saveAndExit="saveAndExit"
  />
</template>

<script>
  import MenuDrawerTemplate from "~/components/shared/templates/MenuDrawerTemplate.vue";
  import { mapMutations, mapGetters, mapActions } from "vuex";
  import { nanoid } from "nanoid";

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
      ...mapGetters({
        entityType: "adventureData/getEntityType",
        chapters: "adventureData/getChapters",
        masternotes: "adventureData/getMasternotes",
        characters: "adventureData/getCharacters",
        locations: "adventureData/getLocations",
        items: "adventureData/getItems",
        enemies: "adventureData/getEnemies",
      }),
    },
    methods: {
      async selectEntity({ entity, type }) {
        await this.readContentById(entity.contentId);
        this.handleTabOpening(entity.id, entity.title, type);
      },
      handleTabOpening(id, title, type) {
        let entity = {
          id: id,
          title: title,
          type: type,
        };
        this.openTab(entity);
      },
      async addEntity(type) {
        const contentId = await this.createContentId();
        switch (type) {
          case "CHAPTER":
            let chapter = {
              id: nanoid(),
              title: "New Chapter",
              description: "Short description",
              contentId: contentId,
            };

            this.createChapter(chapter);
            this.handleTabOpening(
              chapter.id,
              chapter.title,
              this.entityType.CHAPTER
            );
            break;
          case "MASTERNOTE":
            let masternote = {
              id: nanoid(),
              title: "New Masternote",
              contentId: contentId,
            };
            this.createMasternote(masternote);
            this.handleTabOpening(
              masternote.id,
              masternote.title,
              this.entityType.MASTERNOTE
            );
            break;
          case "CHARACTER":
            let character = {
              id: nanoid(),
              title: "New Character",
              profession: "",
              image: "",
              attributes: [],
              skills: [],
              contentId: contentId,
            };
            this.createCharacter(character);
            this.handleTabOpening(
              character.id,
              character.title,
              this.entityType.CHARACTER
            );
            break;
          case "LOCATION":
            let location = {
              id: nanoid(),
              title: "New Location",
              location: "",
              image: "",
              contentId: contentId,
            };
            this.createLocation(location);
            this.handleTabOpening(
              location.id,
              location.title,
              this.entityType.LOCATION
            );
            break;
          case "ITEM":
            let item = {
              id: nanoid(),
              title: "New item",
              type: "",
              stats: [],
              image: "",
              contentId: contentId,
            };
            this.createItem(item);
            this.handleTabOpening(item.id, item.title, this.entityType.ITEM);
            break;
          case "ENEMY":
            let enemy = {
              id: nanoid(),
              title: "New Enemy",
              contentId: contentId,
            };
            this.createEnemy(enemy);
            this.handleTabOpening(enemy.id, enemy.title, this.entityType.ENEMY);
            break;
          default:
            console.log("gibbet net");
            break;
        }
      },
      async saveAndExit() {
        try {
          await this.updateAdventureData();
          this.$nuxt.$emit("alert-success", "Saving complete");
          this.$router.push("/library");
        } catch (error) {
          this.$nuxt.$emit("alert-error", error.message);
        }
      },
      ...mapMutations("adventureData", [
        "createChapter",
        "createMasternote",
        "createCharacter",
        "createLocation",
        "createItem",
        "createEnemy",
      ]),
      ...mapActions("tab", ["openTab"]),
      ...mapActions("adventureData", [
        "readContentById",
        "createContentId",
        "updateAdventureData",
      ]),
    },
  };
</script>

<style></style>
