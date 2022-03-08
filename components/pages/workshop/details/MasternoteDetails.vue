<template>
  <div>
    <v-form ref="masternoteDetails" v-model="valid" lazy-validation>
      <v-text-field
        v-model="title"
        label="Title*"
        :rules="[
          (v) => !!v || 'Title is required',
          (v) => v == undefined || v.length <= 32 || 'Max 32 characters',
        ]"
        counter="32"
        maxlength="32"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    data: () => ({
      valid: false,
    }),
    computed: {
      title: {
        get() {
          return this.getMasternote(this.currentTabObject.id).title;
        },
        set(title) {
          this.setMasternoteTitle({
            id: this.currentTabObject.id,
            title: title,
          });
          this.$store.commit("tab/setCurrentTabTitle", title);
        },
      },
      ...mapGetters({
        currentTabObject: "tab/getCurrentTabObject",
        getMasternote: "adventureData/getMasternote",
      }),
    },
    methods: {
      ...mapMutations("adventureData", ["setMasternote", "setMasternoteTitle"]),
      validate() {
        return this.$refs.masternoteDetails.validate();
      },
    },
  };
</script>

<style></style>
