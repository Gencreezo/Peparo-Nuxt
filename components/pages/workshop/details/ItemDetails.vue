<template>
  <v-form ref="itemDetails" v-model="valid" lazy-validation>
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
    <v-combobox v-model="type" label="type" :items="itemTypes"></v-combobox>
    <v-file-input disabled accept="image/*" label="Image"></v-file-input>
    <div class="mt-2">
      <p class="text-h6 m-0">
        Stats
        <v-btn icon class="ml-2" @click="pushStat()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </p>
    </div>
    <div>
      <v-row
        class="m-0"
        align="center"
        align-content="center"
        v-for="(stat, i) in stats"
        :key="i"
      >
        <v-col cols="6" class="pyl-0">
          <v-text-field
            class="pyl-0 m-0"
            :value="stat.text"
            @input="setStatText($event, i)"
            :placeholder="randomStat()"
            :rules="[
              (v) => v == undefined || v.length <= 16 || 'Max 16 characters',
            ]"
            counter="16"
            maxlength="16"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pyl-0">
          <v-text-field
            class="pyl-0 m-0"
            :value="stat.value"
            @input="setStatValue($event, i)"
            :placeholder="randomValue()"
            :rules="[(v) => v == undefined || v.length <= 5 || 'Max 5 figures']"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-btn icon @click="spliceStat(i)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-form>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    data: () => ({
      valid: false,
      itemTypes: [
        "Weapon",
        "Clothing",
        "Consumeable",
        "Tool",
        "Quest",
        "Ressource",
        "Other",
      ],
    }),
    computed: {
      ...mapGetters({
        currentTabObject: "tab/getCurrentTabObject",
        getItem: "adventureData/getItem",
      }),
      title: {
        get() {
          return this.getItem(this.currentTabObject.id).title;
        },
        set(title) {
          this.setItemTitle({ id: this.currentTabObject.id, title: title });
          this.$store.commit("tab/setCurrentTabTitle", title);
        },
      },
      type: {
        get() {
          return this.getItem(this.currentTabObject.id).type;
        },
        set(type) {
          this.setItemType({ id: this.currentTabObject.id, type: type });
        },
      },
      stats() {
        return this.getItem(this.currentTabObject.id).stats;
      },
      image: {
        get() {
          return this.getItem(this.currentTabObject.id).image;
        },
        set(image) {
          this.setItemImage({ id: this.currentTabObject.id, image: image });
        },
      },
    },
    methods: {
      ...mapMutations("adventureData", [
        "setItemTitle",
        "setItemType",
        "setItemImage",
        "setItemStatText",
        "setItemStatValue",
        "addItemStat",
        "removeItemStat",
      ]),
      validate() {
        return this.$refs.itemDetails.validate();
      },
      setStatText(text, statIndex) {
        this.setItemStatText({
          id: this.currentTabObject.id,
          statIndex: statIndex,
          text: text,
        });
      },
      setStatValue(value, statIndex) {
        this.setItemStatValue({
          id: this.currentTabObject.id,
          statIndex: statIndex,
          value: value,
        });
      },
      pushStat() {
        this.addItemStat(this.currentTabObject.id);
      },
      spliceStat(i) {
        this.removeItemStat({ id: this.currentTabObject.id, statIndex: i });
      },
      randomStat() {
        let phStat = [
          "Damage",
          "Heal",
          "Armor",
          "Intelligence",
          "Strength",
          "Block",
        ];
        let random = Math.floor(Math.random() * phStat.length);
        return phStat[random];
      },
      randomValue() {
        let phDice = [
          "10",
          "55",
          "120",
          "10000",
          "1D3",
          "1D6",
          "2D6",
          "1D12",
          "1D20",
          "1D100",
        ];
        let random = Math.floor(Math.random() * phDice.length);
        return phDice[random];
      },
    },
  };
</script>

<style></style>
