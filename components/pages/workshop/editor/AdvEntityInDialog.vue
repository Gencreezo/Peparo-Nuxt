<template>
  <node-view-wrapper class="adv-entity-in-dialog">
    <span v-if="!unknownEntity" class="primary--text">
      @{{ entity.title }}
    </span>
    <span v-if="unknownEntity" class="error--text"> ??UNKNOWN?? </span>
  </node-view-wrapper>
</template>

<script>
  import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";
  import { mapGetters } from "vuex";
  export default {
    components: {
      NodeViewWrapper,
    },
    data: () => ({
      unknownEntity: true, // default true damit der Dialog nicht geladen wird falls es wirklich true ist
      showDialog: false,
      dialogTitle: "",
      dialogIcon: "",
      entity: {
        title: "PLACEHOLDER",
      },
    }),
    props: {
      nodeViewProps,
    },
    mounted() {
      switch (this.node.attrs.entityType) {
        case "0":
          this.entity = this.getMasternote(this.node.attrs.entityId);
          this.dialogIcon = "mdi-note";
          break;
        case "1":
          this.entity = this.getCharacter(this.node.attrs.entityId);
          this.dialogIcon = "mdi-card-account-details";
          break;
        case "2":
          this.entity = this.getLocation(this.node.attrs.entityId);
          this.dialogIcon = "mdi-map";
          break;
        case "3":
          this.entity = this.getItem(this.node.attrs.entityId);
          this.dialogIcon = "mdi-bag-personal";
          break;
        case "4":
          this.entity = this.getEnemy(this.node.attrs.entityId);
          this.dialogIcon = "mdi-dog";
          break;
        default:
          this.dialogIcon = "";
          this.entity = {
            title: "??UNKNOWN??",
          };
          break;
      }
      if (!this.entity) {
        // no entity found (deleted?)
        this.unknownEntity = true;
        this.dialogIcon = "";
        this.entity = {
          title: "??UNKNOWN??",
        };
      } else {
        this.unknownEntity = false;
      }
    },
    computed: {
      ...mapGetters({
        getMasternote: "adventureData/getMasternote",
        getCharacter: "adventureData/getCharacter",
        getLocation: "adventureData/getLocation",
        getItem: "adventureData/getItem",
        getEnemy: "adventureData/getEnemy",
        getContentById: "adventureData/getContentById",
      }),
    },
  };
</script>

<style>
  .adv-entity-in-dialog {
    display: inline-grid;
  }
</style>
