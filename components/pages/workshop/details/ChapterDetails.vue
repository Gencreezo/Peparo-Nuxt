<template>
  <div>
    <v-form ref="chapterDetails" v-model="valid" lazy-validation>
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
      <v-textarea
        v-model="description"
        label="Description"
        :rules="[
          (v) => v == undefined || v.length <= 250 || 'Max 250 characters',
        ]"
        counter="250"
        maxlength="250"
        auto-grow
      >
      </v-textarea>
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
          return this.getChapter(this.currentTabObject.id).title;
        },
        set(title) {
          this.setChapterTitle({ id: this.currentTabObject.id, title: title });
          this.setCurrentTabTitle(title);
        },
      },
      description: {
        get() {
          return this.getChapter(this.currentTabObject.id).description;
        },
        set(description) {
          this.setChapterDescription({
            id: this.currentTabObject.id,
            description: description,
          });
        },
      },
      ...mapGetters({
        currentTabObject: "tab/getCurrentTabObject",
        getChapter: "adventureData/getChapter",
      }),
    },
    methods: {
      ...mapMutations("adventureData", [
        "setChapterTitle",
        "setChapterDescription",
      ]),
      ...mapMutations("tab", ["setCurrentTabTitle"]),
      validate() {
        return this.$refs.chapterDetails.validate();
      },
    },
  };
</script>

<style></style>
