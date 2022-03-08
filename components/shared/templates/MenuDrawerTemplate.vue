<template>
  <v-navigation-drawer permanent app clipped width="250">
    <v-navigation-drawer
      absolute
      permanent
      mini-variant
      mini-variant-width="70px"
    >
      <v-list class="fill-height">
        <!-- Chapters MenuBtn -->
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
              @click="selectCategory(categoryChapter)"
            >
              <v-list-item-icon>
                <v-icon size="42px">{{ categoryChapter.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ categoryChapter.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ categoryChapter.label }}</span>
        </v-tooltip>
        <v-divider />

        <!-- Category MenuBtns (Masternotes, Characters, ...) -->
        <v-tooltip right v-for="item in menuItems" :key="item.label">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" @click="selectCategory(item)">
              <v-list-item-icon>
                <v-icon size="42px">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <!-- Bouncing items fixed, v-list-item-content has to persist
                even if not used to prevent bouncing items.
                https://github.com/vuetifyjs/vuetify/issues/10254 -->
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.label }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.label }}</span>
        </v-tooltip>
      </v-list>

      <!-- Settings -->
      <template v-slot:append v-if="withSettingsAndExit">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item
              link
              v-bind="attrs"
              v-on="on"
              @click="openAdventureDialog"
            >
              <v-list-item-icon>
                <v-icon size="42px">mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>Settings</span>
        </v-tooltip>
        <AdventureDialog
          :show="showAdventureDialog"
          :adventureId="adventureId"
          :editAdv="true"
          @close="closeAdventureDialog"
        />

        <!-- Exit -->
        <v-menu top offset-x transition="slide-y-reverse-transition">
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-tooltip right>
              <template
                v-slot:activator="{ on: onTooltip, attrs: attrsTooltip }"
              >
                <v-list-item
                  v-bind="{ ...attrsMenu, ...attrsTooltip }"
                  v-on="{ ...onMenu, ...onTooltip }"
                >
                  <v-list-item-icon>
                    <v-icon size="42px">mdi-exit-to-app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Exit</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <span>Exit</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item @click="exit">
              <v-list-item-title>Exit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="saveAndExit" :disabled="saving">
              <v-list-item-title>Save and Exit</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-navigation-drawer>

    <!-- Entity Items -->
    <v-list class="pl-16" shaped>
      <v-list-item>
        <h2>{{ selectedCategory.label }}</h2>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="(entity, i) in entityList(selectedCategory.entityType)"
        :key="i"
        link
        @click="selectEntity(entity, selectedCategory.entityType)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ entity.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-if="withAddButton">
        <v-list-item>
          <v-list-item-content>
            <v-btn
              text
              class="text-none"
              @click="addEntity(selectedCategory.entityType)"
            >
              <v-icon small class="mr-3">mdi-plus</v-icon>
              Add New
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import AdventureDialog from "@/components/shared/dialogs/AdventureDialog";

  export default {
    components: {
      AdventureDialog,
    },
    data() {
      return {
        saving: false,
        showAdventureDialog: false,
        categoryChapter: {
          label: "Chapters",
          icon: "mdi-book",
          entityType: "CHAPTER",
        },
        selectedCategory: {
          label: "Chapters",
          icon: "mdi-book",
          entityType: "CHAPTER",
        },
        menuItems: [
          {
            label: "Masternotes",
            icon: "mdi-note",
            entityType: "MASTERNOTE",
          },
          {
            label: "Characters",
            icon: "mdi-card-account-details",
            entityType: "CHARACTER",
          },
          {
            label: "Locations",
            icon: "mdi-map",
            entityType: "LOCATION",
          },
          {
            label: "Items",
            icon: "mdi-bag-personal",
            entityType: "ITEM",
          },
          {
            label: "Enemies",
            icon: "mdi-dog",
            entityType: "ENEMY",
          },
        ],
      };
    },
    props: {
      adventureId: String,
      withAddButton: false,
      withSettingsAndExit: false,
    },
    computed: {
      ...mapGetters({
        entityList: "adventureData/getEntityListByType",
      }),
    },
    methods: {
      selectCategory(value) {
        this.selectedCategory = value;
      },
      selectEntity(entity, type) {
        this.$emit("selectEntity", { entity: entity, type: type });
      },
      addEntity(type) {
        this.$emit("addEntity", type);
      },
      openAdventureDialog() {
        this.showAdventureDialog = true;
      },
      closeAdventureDialog() {
        this.showAdventureDialog = false;
      },
      exit() {
        this.$router.push("/library");
      },
      delay(ms) {
        return new Promise((res) => setTimeout(res, ms));
      },
      async saveAndExit() {
        this.saving = true;
        this.$emit("saveAndExit");
        await this.delay(2000); // wait 2 sec (anti spam)
        this.saving = false;
      },
      ...mapActions("adventureData", ["readContentById", "createContentId"]),
    },
  };
</script>

<style></style>
