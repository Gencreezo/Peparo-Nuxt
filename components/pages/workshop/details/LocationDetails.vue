<template>
  <v-form ref="locationDetails" v-model="valid" lazy-validation>
    <v-text-field
      v-model="title"
      label="Name"
      :rules="[
        (v) => !!v || 'Name is required',
        (v) => v == undefined || v.length <= 32 || 'Max 32 characters',
      ]"
      counter="32"
      maxlength="32"
      required
    ></v-text-field>
    <v-text-field
      v-model="location"
      label="Location"
      placeholder="Province / Area / City"
      :rules="[(v) => v == undefined || v.length <= 32 || 'Max 32 characters']"
      counter="32"
      maxlength="32"
    ></v-text-field>
    <v-file-input disabled accept="image/*" label="Image"></v-file-input>
  </v-form>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    data: () => ({
      valid: false,
    }),
    computed: {
      ...mapGetters({
        currentTabObject: "tab/getCurrentTabObject",
        getLocation: "adventureData/getLocation",
      }),
      title: {
        get() {
          return this.getLocation(this.currentTabObject.id).title;
        },
        set(title) {
          this.setLocationTitle({ id: this.currentTabObject.id, title: title });
          this.$store.commit("tab/setCurrentTabTitle", title);
        },
      },
      location: {
        get() {
          return this.getLocation(this.currentTabObject.id).location;
        },
        set(location) {
          this.setLocationLocation({
            id: this.currentTabObject.id,
            location: location,
          });
        },
      },
      image: {
        get() {
          return this.getLocation(this.currentTabObject.id).image;
        },
        set(image) {
          this.setLocationImage({ id: this.currentTabObject.id, image: image });
        },
      },
    },
    methods: {
      ...mapMutations("adventureData", [
        "setLocationTitle",
        "setLocationLocation",
        "setLocationImage",
      ]),
      validate() {
        return this.$refs.locationDetails.validate();
      },
    },
  };
</script>

<style></style>
