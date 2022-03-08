<template>
  <v-form ref="enemyDetails" v-model="valid" lazy-validation>
    <v-text-field
      v-model="title"
      label="Name"
      :rules="[
        (v) => !!v || 'Name is required',
        (v) => v == undefined || v.length <= 32 || 'Max 32 enemys',
      ]"
      counter="32"
      maxlength="32"
      required
    ></v-text-field>
    <v-text-field
      v-model="profession"
      label="Profession"
      :rules="[(v) => v == undefined || v.length <= 32 || 'Max 32 enemys']"
      counter="32"
      maxlength="32"
    ></v-text-field>
    <v-file-input disabled accept="image/*" label="Image"></v-file-input>
    <div class="mt-2">
      <p class="text-h6 m-0">
        Attributes
        <v-btn icon class="ml-2" @click="pushAttribute()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </p>
    </div>
    <div>
      <v-row
        class="m-0"
        align="center"
        align-content="center"
        v-for="(attribute, i) in attributes"
        :key="i"
      >
        <v-col cols="6" class="pyl-0">
          <v-text-field
            class="pyl-0 m-0"
            :value="attribute.text"
            @input="setAttributeText($event, i)"
            :placeholder="randomAttribute()"
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
            :value="attribute.value"
            @input="setAttributeValue($event, i)"
            :placeholder="randomValue()"
            :rules="[(v) => v == undefined || v.length <= 5 || 'Max 5 figures']"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-btn icon @click="spliceAttribute(i)">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-row>
    </div>
    <div class="mt-5">
      <p class="text-h6 m-0">
        Skills
        <v-btn icon class="ml-2" @click="pushSkill()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </p>
    </div>
    <div>
      <v-row class="m-0" align="center" v-for="(skill, i) in skills" :key="i">
        <v-col cols="6" class="pyl-0">
          <v-text-field
            :value="skill.text"
            @input="setSkillText($event, i)"
            :placeholder="randomAttribute()"
            :rules="[
              (v) => v == undefined || v.length <= 16 || 'Max 16 characters',
            ]"
            counter="16"
            maxlength="16"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pyl-0">
          <v-text-field
            :value="skill.value"
            @input="setSkillValue($event, i)"
            :placeholder="randomValue()"
            :rules="[(v) => v == undefined || v.length <= 5 || 'Max 5 figures']"
            maxlength="5"
          ></v-text-field>
        </v-col>
        <v-btn icon @click="spliceSkill(i)">
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
    }),
    computed: {
      ...mapGetters({
        currentTabObject: "tab/getCurrentTabObject",
        getEnemy: "adventureData/getEnemy",
      }),
      title: {
        get() {
          return this.getEnemy(this.currentTabObject.id).title;
        },
        set(title) {
          this.setEnemyTitle({ id: this.currentTabObject.id, title: title });
          this.$store.commit("tab/setCurrentTabTitle", title);
        },
      },
      profession: {
        get() {
          return this.getEnemy(this.currentTabObject.id).profession;
        },
        set(profession) {
          this.setEnemyProfession({
            id: this.currentTabObject.id,
            profession: profession,
          });
        },
      },
      image: {
        get() {
          return this.getEnemy(this.currentTabObject.id).image;
        },
        set(image) {
          this.setEnemyImage({ id: this.currentTabObject.id, image: image });
        },
      },
      attributes() {
        return this.getEnemy(this.currentTabObject.id).attributes;
      },
      skills() {
        return this.getEnemy(this.currentTabObject.id).skills;
      },
    },
    methods: {
      ...mapMutations("adventureData", [
        "setEnemyTitle",
        "setEnemyProfession",
        "setEnemyImage",
        "setEnemyAttributeText",
        "setEnemyAttributeValue",
        "setEnemySkillText",
        "setEnemySkillValue",
        "addEnemyAttribute",
        "addEnemySkill",
        "removeEnemyAttribute",
        "removeEnemySkill",
      ]),
      validate() {
        return this.$refs.enemyDetails.validate();
      },

      // Attribute mutations
      setAttributeText(text, attrIndex) {
        this.setEnemyAttributeText({
          id: this.currentTabObject.id,
          attrIndex: attrIndex,
          text: text,
        });
      },
      setAttributeValue(value, attrIndex) {
        this.setEnemyAttributeValue({
          id: this.currentTabObject.id,
          attrIndex: attrIndex,
          value: value,
        });
      },
      pushAttribute() {
        this.addEnemyAttribute(this.currentTabObject.id);
      },
      spliceAttribute(i) {
        this.removeEnemyAttribute({
          id: this.currentTabObject.id,
          attrIndex: i,
        });
      },
      randomAttribute() {
        let phAttribute = [
          "Strength",
          "Finesse",
          "Stamina",
          "Intelligence",
          "Charisma",
          "Mental",
        ];
        let random = Math.floor(Math.random() * phAttribute.length);
        return phAttribute[random];
      },

      // Skill mutations
      setSkillText(text, skillIndex) {
        this.setEnemySkillText({
          id: this.currentTabObject.id,
          skillIndex: skillIndex,
          text: text,
        });
      },
      setSkillValue(value, skillIndex) {
        this.setEnemySkillValue({
          id: this.currentTabObject.id,
          skillIndex: skillIndex,
          value: value,
        });
      },
      pushSkill() {
        this.addEnemySkill(this.currentTabObject.id);
      },
      spliceSkill(i) {
        this.removeEnemySkill({ id: this.currentTabObject.id, skillIndex: i });
      },
      randomSkill() {
        let phSkill = [
          "Crafting",
          "Swordfighting",
          "Blacksmithing",
          "Athletic",
          "Provoking",
          "Intimidate",
          "Persuade",
        ];
        let random = Math.floor(Math.random() * phSkill.length);
        return phSkill[random];
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

<style>
  .pyl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: 0 !important;
  }
  .m-0 {
    margin: 0 !important;
  }
</style>
