<template>
  <v-dialog v-model="showDialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"
        ><v-icon>mdi-delete</v-icon> Are you sure?
      </v-card-title>
      <v-card-text>This cannot be undone!</v-card-text>
      <v-card-actions>
        <v-btn @click="cancelDialog"> Cancel </v-btn>
        <v-spacer />
        <v-btn color="error" @click="confirmDialog">
          <v-icon>mdi-delete</v-icon> Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      show: Boolean,
    },
    computed: {
      showDialog: {
        get() {
          return this.show;
        },
      },
    },
    methods: {
      confirmDialog() {
        this.$emit("confirm");
      },
      cancelDialog() {
        this.$emit("cancel");
      },
    },
  };
</script>

<style></style>
