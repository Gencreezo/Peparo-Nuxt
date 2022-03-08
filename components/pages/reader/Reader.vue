<template>
  <v-card v-if="reader" id="reader" class="fill-height pa-0 ma-0">
    <v-card-text id="reader-content-wrapper">
      <editor-content id="reader-content" spellcheck="false" :editor="reader" />
    </v-card-text>
  </v-card>
</template>

<script>
  import { Editor, EditorContent, VueRenderer } from "@tiptap/vue-2";
  import StarterKit from "@tiptap/starter-kit";
  import Highlight from "@tiptap/extension-highlight";
  import TextAlign from "@tiptap/extension-text-align";
  import AdvEntity from "~/components/pages/workshop/editor/AdvEntityNode.js";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    components: {
      EditorContent,
    },
    data: () => ({
      reader: null,
      editable: false,
    }),
    computed: {
      contentObj() {
        if (this.currentPage.contentId != null) {
          return this.getContentById(this.currentPage.contentId);
        }

        return {};
      },
      ...mapGetters({
        currentPage: "reader/getCurrentPage",
        getContentById: "adventureData/getContentById",
      }),
    },
    mounted() {
      this.reader = new Editor({
        editable: this.editable,
        content: this.contentObj.content,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Highlight.configure({ multicolor: true }),
          AdvEntity.configure({ editable: this.editable }),
        ],
      });
    },
  };
</script>

<style>
  #reader {
    display: flex;
    flex-direction: column;
  }
  #reader-content-wrapper {
    flex: 1;
    padding: 0;
    color: inherit;
  }
  #reader-content {
    background-color: grey;
    position: relative;
    height: 100%;
    width: 100%;
    margin: auto;
    overflow-y: scroll !important;
  }
  #reader-content .ProseMirror {
    outline: 0 !important;
    margin: auto !important;
    padding: 48px;
    min-height: 100%;
    max-height: fit-content;
    width: 21cm;
    background: white;
  }
</style>
