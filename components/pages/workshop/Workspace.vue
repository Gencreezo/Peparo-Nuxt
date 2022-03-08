<template>
  <v-row class="pa-0 ma-0 fill-height">
    <v-col cols="12" class="secondary pa-0 ma-0">
      <v-tabs v-model="tabIndex" show-arrows hide-slider>
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          active-class="active-tab"
          @click.native.prevent.stop="setCurrentTab(i)"
        >
          {{ tab.title | subString }}
          <v-spacer></v-spacer>
          <v-btn
            x-small
            icon
            class="ml-2 mr-n3"
            @click.native.prevent.stop="closeTab(i)"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
      <v-tabs-items mandatory v-model="tabIndex" class="tab-item-height">
        <v-tab-item
          v-for="(tab, i) in tabs"
          :key="tab.id + i"
          :value="i"
          class="fill-height"
          transition="false"
        >
          <v-card flat class="fill-height">
            <Editor />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <v-btn
        :loading="saving"
        class="saveFab"
        color="primary"
        dark
        absolute
        bottom
        right
        fab
        @click="save"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  import Editor from "./editor/Editor";
  import { mapGetters } from "vuex";
  export default {
    components: {
      Editor,
    },
    data: () => ({
      saving: false,
    }),
    computed: {
      tabIndex: {
        get() {
          return this.getCurrentTab;
        },
        set(val) {
          if (val === undefined) {
            this.setCurrentTab(this.getCurrentTab);
          }
        },
      },
      ...mapGetters({
        getCurrentTab: "tab/getCurrentTab",
        tabs: "tab/getTabs",
      }),
    },
    filters: {
      subString(string) {
        if (string.length > 16) {
          return string.substring(0, 15) + "...";
        } else {
          return string;
        }
      },
    },
    methods: {
      closeTab(index) {
        this.$store.dispatch("tab/closeTab", index);
      },
      setCurrentTab(tabIndex) {
        this.$store.commit("tab/setCurrentTab", tabIndex);
      },
      delay(ms) {
        return new Promise((res) => setTimeout(res, ms));
      },
      async save() {
        this.saving = true;
        try {
          await this.$store.dispatch("adventureData/updateAdventureData");
          await this.delay(2000); // wait 2 sec (anti spam)
          this.$nuxt.$emit("alert-success", "Saving complete");
        } catch (error) {
          this.$nuxt.$emit("alert-error", error);
        }
        this.saving = false;
      },
    },
    beforeDestroy() {
      this.$store.dispatch("tab/closeAllTabs");
    },
  };
</script>

<style>
  .tab-item-height {
    height: calc(100% - 48px);
  }
  .tab-item-height .v-window__container {
    height: 100%;
    display: block;
  }
  .saveFab {
    bottom: 24px !important;
    right: 24px !important;
  }
  .active-tab {
    background-color: #1976d225;
  }
</style>
