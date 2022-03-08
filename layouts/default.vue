<template>
  <v-app>
    <v-app-bar fixed app clipped-right clipped-left v-if="!maintenance">
      <v-img contain max-height="48" max-width="48" src="/Logo_Icon.svg" />
      <v-toolbar-title class="ml-2" v-text="title" />
      <div class="hidden-sm-and-down">
        <v-btn
          text
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          v-text="item.title"
          router
          exact
        ></v-btn>
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon
            class="hidden-md-and-up ml-3"
            v-on="on"
          ></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            class="ma-0"
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <ProfileMenu />
    </v-app-bar>
    <Alert />
    <v-main>
      <v-container fluid class="fill-height pa-0 ma-0">
        <nuxt v-if="!maintenance" />
        <Maintenance v-if="maintenance" />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Maintenance from "@/pages/maintenance";
  import ProfileMenu from "@/components/core/ProfileMenu";
  import Alert from "@/components/core/Alert.vue";

  export default {
    components: {
      Maintenance,
      ProfileMenu,
      Alert,
    },
    data() {
      return {
        title: "Peparo",
        maintenance: false,
        items: [
          {
            title: "Home",
            to: "/",
          },
          {
            title: "Library",
            to: "/library",
          },
          {
            title: "Shop",
            to: "/shop",
          },
          {
            title: "Community",
            to: "/community",
          },
        ],
      };
    },
  };
</script>

<style scoped>
  a {
    margin-inline: 2.5rem;
  }
  .v-application {
    background: #f6f7f9;
  }
</style>
