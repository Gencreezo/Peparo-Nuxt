<template>
  <v-dialog v-model="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span v-if="!edit" class="headline"
          ><v-icon left>mdi-plus</v-icon> New Adventure</span
        >
        <span v-if="edit" class="headline"
          ><v-icon left>mdi-pencil</v-icon> Edit Adventure</span
        >
      </v-card-title>
      <v-card-text>
        <v-form ref="adventureDialog" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="adventure.data.title"
                label="Title*"
                :rules="[
                  (v) => !!v || 'Title is required',
                  (v) =>
                    v == undefined || v.length <= 32 || 'Max 32 characters',
                ]"
                counter="32"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="adventure.data.subtitle"
                label="Subtitle*"
                :rules="[
                  (v) => !!v || 'Subtitle is required',
                  (v) =>
                    v == undefined || v.length <= 48 || 'Max 48 characters',
                ]"
                counter="48"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="adventure.data.players"
                :items="['2-3', '3-4', '4-5', '5+']"
                label="Players"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-autocomplete
                v-model="adventure.data.tags"
                :items="[
                  'Medieval',
                  'SciFi',
                  'Magic',
                  'Reallife',
                  'Pirates',
                  'Horror',
                ]"
                label="Tags/Genres"
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12">
              <v-slider
                v-model="adventure.data.difficulty"
                :color="difficultySliderColor"
                :track-color="difficultySliderColor"
                :tick-labels="[
                  'Beginner',
                  'Intermediate',
                  'Expert',
                  'Unbeatable',
                ]"
                :max="3"
                step="1"
                ticks="always"
                tick-size="8"
                label="Difficulty"
              ></v-slider>
            </v-col>
            <v-col cols="12" sm="12">
              <v-slider
                v-model="adventure.data.length"
                :tick-labels="['1h-2h', '2h-4h', '4h-6h', '6h-8h', '>8h']"
                :max="4"
                step="1"
                ticks="always"
                tick-size="8"
                label="Length"
              ></v-slider>
            </v-col>
          </v-row>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="edit" color="error" text @click="removeAdv">
          Delete
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="close()" text> Close </v-btn>
        <v-btn
          v-if="!edit"
          :disabled="loading || !valid"
          :loading="loading"
          color="success"
          @click="create()"
        >
          Create
        </v-btn>
        <v-btn
          v-if="edit"
          :disabled="loading || !valid"
          :loading="loading"
          color="success"
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
      <ConfirmDeleteDialog
        :show="showDeleteDialog"
        @cancel="cancelDelete"
        @confirm="confirmDelete"
      />
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from "vuex";

  import ConfirmDeleteDialog from "@/components/shared/dialogs/ConfirmDeleteDialog";

  export default {
    components: {
      ConfirmDeleteDialog,
    },
    data: () => ({
      valid: false,
      loading: false,
      showDeleteDialog: false,
      adventure: {
        id: "",
        data: {
          advDataId: "",
          title: "",
          subtitle: "",
          author: "",
          players: "",
          tags: [],
          difficulty: "",
          length: "",
          published: false,
        },
      },
    }),
    props: {
      show: Boolean,
      editAdv: Boolean,
      adventureId: String,
    },
    watch: {
      show() {
        if (this.adventureId != undefined) {
          const adv = this.getAdvById(this.adventureId);
          this.adventure.id = adv.id;
          this.adventure.data = {
            advDataId: adv.data.advDataId,
            title: adv.data.title,
            subtitle: adv.data.subtitle,
            author: adv.data.author,
            players: adv.data.players,
            tags: adv.data.tags,
            difficulty: adv.data.difficulty,
            length: adv.data.length,
            published: adv.data.published,
          };
        }
      },
    },
    computed: {
      edit: {
        get() {
          return this.editAdv;
        },
      },
      showDialog: {
        get() {
          return this.show;
        },
        set() {
          this.$emit("close");
        },
      },
      difficultySliderColor() {
        if (this.adventure.data.difficulty < 1) return "blue";
        if (this.adventure.data.difficulty < 2) return "green";
        if (this.adventure.data.difficulty < 3) return "orange";
        return "red";
      },
      ...mapGetters({
        getAdvById: "adventure/getAdvById",
        getAdvDataIdByAdvId: "adventure/getAdvDataIdByAdvId",
      }),
    },
    methods: {
      validate() {
        return this.$refs.adventureDialog.validate();
      },
      close() {
        this.showDialog = false;
        this.clear();
      },
      removeAdv() {
        this.showDeleteDialog = true;
      },
      async create() {
        if (this.validate()) {
          this.loading = true;
          await this.$store.dispatch("adventure/createAdventure", {
            ...this.adventure.data,
          });
          this.loading = false;
          this.showDialog = false;
          this.clear();
        }
      },
      async save() {
        if (this.validate()) {
          this.loading = true;
          await this.$store.dispatch("adventure/updateAdventure", {
            adventure: { ...this.adventure },
          });
          this.loading = false;
          this.showDialog = false;
          this.clear();
        }
      },
      cancelDelete() {
        this.showDeleteDialog = false;
      },
      confirmDelete() {
        let advDataId = this.getAdvDataIdByAdvId(this.adventureId);
        this.$store.dispatch("adventure/deleteAdventure", {
          adventureId: this.adventureId,
          advDataId: advDataId,
        });
        this.showDeleteDialog = false;
        this.close();
        this.$router.push("/library");
      },
      clear() {
        this.$refs.adventureDialog.resetValidation();
        this.adventure = {
          id: "",
          data: {
            title: "",
            subtitle: "",
            author: "",
            players: "",
            tags: [],
            published: false,
            advDataId: "",
          },
        };
      },
    },
  };
</script>

<style></style>
