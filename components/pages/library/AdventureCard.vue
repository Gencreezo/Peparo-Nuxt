<template>
  <v-hover close-delay="150" v-slot="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      class="mx-2 adventure"
      :to="'/reader/' + adv.id"
    >
      <v-responsive :aspect-ratio="2 / 3">
        <v-card-title>{{ adv.data.title }}</v-card-title>
        <v-card-subtitle>{{ adv.data.subtitle }}</v-card-subtitle>
        <v-spacer />
        <v-card-actions
          class="d-flex justify-space-between"
          :class="{ 'on-hover': hover }"
        >
          <v-btn class="hidden" fab x-small></v-btn>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green"
                outlined
                fab
                small
                v-bind="attrs"
                v-on="on"
                class="mr-1 align-content-center"
                @click.native.prevent="goToWorkshop"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Write</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="0"
                icon
                fab
                small
                :color="'grey'"
                v-bind="attrs"
                v-on="on"
                @click.prevent.native="editAdv"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </v-card-actions>
      </v-responsive>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      adventure: Object,
      index: Number,
    },
    computed: {
      adv: {
        get() {
          return this.adventure;
        },
      },
    },
    methods: {
      goToWorkshop() {
        this.$router.push("/workshop/" + this.adv.id);
      },
      goToReader() {
        this.$router.push("/reader/" + this.adv.id);
      },
      editAdv() {
        this.$emit("editAdv", this.adv.id);
      },
    },
  };
</script>

<style>
  .adventure {
    transition: opacity 0.3s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;
  }

  .adventure:not(.on-hover) {
    opacity: 0.6;
  }

  .adventure .v-card__actions {
    transition: opacity 0.3s ease-in-out;
  }

  .adventure .v-card__actions.on-hover {
    opacity: 1 !important;
  }

  .adventure .v-card__actions:not(.on-hover) {
    opacity: 0;
  }

  .adventure .v-responsive {
    pointer-events: none;
  }

  .adventure .v-responsive__content {
    display: flex;
    flex-direction: column;
    pointer-events: none;
  }

  .adventure .v-card__title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-bottom: 0;
    margin-bottom: 16px;
  }

  .adventure .v-card__subtitle {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding-bottom: 0;
  }

  .adventure .v-card__actions button,
  .adventure .v-card__actions a {
    pointer-events: all;
  }

  .hidden {
    visibility: hidden;
  }
</style>
