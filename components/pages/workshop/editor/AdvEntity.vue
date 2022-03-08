<template>
  <node-view-wrapper id="adv-entity">
    <template v-if="!unknownEntity">
      <v-dialog v-model="showDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline"
            ><v-icon>{{ dialogIcon }}</v-icon>
            <div class="mx-2"></div>
            {{ entity.title }}
          </v-card-title>
          <v-card-text id="reader-content-wrapper">
            <editor-content
              id="reader-content"
              spellcheck="false"
              :editor="reader"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="closeDialog" text> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-btn
      v-if="!unknownEntity"
      color="primary"
      class="text-none"
      @click="showContent"
      text
      >@{{ entity.title }}</v-btn
    >
    <v-btn v-if="unknownEntity" color="error" class="text-none" text
      >??UNKNOWN??</v-btn
    >
  </node-view-wrapper>
</template>

<script>
  import {
    Editor,
    EditorContent,
    NodeViewWrapper,
    nodeViewProps,
  } from "@tiptap/vue-2";
  import StarterKit from "@tiptap/starter-kit";
  import Highlight from "@tiptap/extension-highlight";
  import TextAlign from "@tiptap/extension-text-align";
  import AdvEntity from "~/components/pages/workshop/editor/AdvEntityNode.js";
  import { mapGetters, mapActions } from "vuex";

  export default {
    components: {
      EditorContent,
      NodeViewWrapper,
    },
    data: () => ({
      editable: false,
      reader: null,
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
      } else {
        this.unknownEntity = false;
        this.readContentById(this.entity.contentId).then(() => {
          this.reader = new Editor({
            editable: this.editable,
            content: this.content,
            extensions: [
              StarterKit,
              TextAlign.configure({
                types: ["heading", "paragraph"],
              }),
              Highlight.configure({ multicolor: true }),
              AdvEntity.configure({ editable: this.editable }),
            ],
          });
        });
      }
    },
    computed: {
      content() {
        if (this.entity.contentId) {
          return this.getContentTextById(this.entity.contentId);
        }
        return "??UNKNOWN??";
      },
      ...mapGetters({
        getMasternote: "adventureData/getMasternote",
        getCharacter: "adventureData/getCharacter",
        getLocation: "adventureData/getLocation",
        getItem: "adventureData/getItem",
        getEnemy: "adventureData/getEnemy",
        getContentTextById: "adventureData/getContentTextById",
      }),
    },
    created() {
      this.unwatch = this.$store.watch(
        (state, getters) =>
          getters["adventureData/getContentTextById"](this.entity.contentId),
        (newValue, oldValue) => {
          this.reader?.commands.setContent(newValue);
        }
      );
    },
    methods: {
      increase() {
        this.updateAttributes({
          count: this.node.attrs.count + 1,
        });
      },
      showContent() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = false;
      },
      ...mapActions("adventureData", ["readContentById"]),
    },
  };
</script>

<style>
  #adv-entity {
    display: inline-grid;
  }
  #adv-entity button {
    height: 24px;
    display: inline-block;
    padding: 0;
  }
</style>
