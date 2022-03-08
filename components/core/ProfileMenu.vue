<template>
  <div>
    <v-menu bottom left v-if="user.id != null" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text large>
          <v-avatar color="primary" size="35">
            <v-icon color="white"> mdi-account </v-icon>
          </v-avatar>
          <v-icon right> mdi-chevron-down </v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item>
          <span>
            {{ user.username }}
          </span>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(item, i) in userActions"
          :key="i"
          link
          flat
          @click="item.clickFunction"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action></v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-else>
      <v-btn to="login">Sign In</v-btn>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userActions: [
          {
            title: "Profile Settings",
            icon: "mdi-cog",
            clickFunction: this.gotoProfile,
          },
          {
            title: "Sign out",
            icon: "mdi-logout",
            clickFunction: this.logout,
          },
        ],
      };
    },
    computed: {
      user: function () {
        return this.$store.getters["auth/GET_USER"];
      },
    },
    methods: {
      logout() {
        this.$store.dispatch("auth/signOut").then(() => {
          this.$router.push("/");
        });
      },
      gotoProfile() {
        this.$router.push("/profile");
      },
    },
  };
</script>

<style></style>
