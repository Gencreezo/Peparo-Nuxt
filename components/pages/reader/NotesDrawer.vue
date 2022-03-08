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
        <h2 v-if="!mini" class="ml-3">Notes</h2>
      </v-list-item>

      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      mini: false,
    }),
  };
</script>

<style></style>
