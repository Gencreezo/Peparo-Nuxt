<template>
  <v-card v-if="editor" id="editor" class="fill-height pa-0 ma-0">
    <v-divider></v-divider>
    <v-toolbar elevation="0" id="editor-toolbar" dense>
      <v-btn
        text
        tile
        class="toolbar-btn"
        @click="editor.chain().focus().undo().run()"
      >
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn
        text
        tile
        class="toolbar-btn"
        @click="editor.chain().focus().redo().run()"
      >
        <v-icon>mdi-redo</v-icon>
      </v-btn>

      <div class="mx-4"></div>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="bold"
        @click="editor.chain().toggleBold().focus().run()"
      >
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="italic"
        @click="editor.chain().toggleItalic().focus().run()"
      >
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>

      <v-btn
        text
        tile
        class="toolbar-btn tool-with-color"
        active-class="primary--text"
        v-model="highlight"
        @click="
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: highlight_color })
            .run()
        "
      >
        <v-row align="center" class="flex-column" justify="center">
          <v-icon class="cols 12"> mdi-format-color-highlight </v-icon>

          <v-sheet
            tile
            style="margin-top: -4px"
            height="4"
            width="26"
            :color="highlight_color"
          ></v-sheet>
        </v-row>
      </v-btn>

      <v-menu v-model="highlight_color_picker" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            tile
            class="toolbar-btn toolbar-menu-btn"
            active-class="primary--text"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-color-picker
          id="highlight_color_picker"
          hide-canvas
          hide-inputs
          hide-mode-switch
          hide-sliders
          show-swatches
          v-model="highlight_color"
          :swatches="highlight_color_picker_colors"
        ></v-color-picker>
      </v-menu>

      <div class="mx-4"></div>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="h1"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </v-btn>
      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="h2"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <v-icon>mdi-format-header-2</v-icon>
      </v-btn>
      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="h3"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <v-icon>mdi-format-header-3</v-icon>
      </v-btn>

      <div class="mx-4"></div>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="textAlignLeft"
        @click="editor.chain().setTextAlign('left').focus().run()"
      >
        <v-icon>mdi-format-align-left</v-icon>
      </v-btn>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="textAlignCenter"
        @click="editor.chain().setTextAlign('center').focus().run()"
      >
        <v-icon>mdi-format-align-center</v-icon>
      </v-btn>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="textAlignRight"
        @click="editor.chain().setTextAlign('right').focus().run()"
      >
        <v-icon>mdi-format-align-right</v-icon>
      </v-btn>

      <v-btn
        text
        tile
        class="toolbar-btn"
        active-class="primary--text"
        v-model="textAlignJustify"
        @click="editor.chain().focus().setTextAlign('justify').run()"
      >
        <v-icon>mdi-format-align-justify</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text id="editor-content-wrapper">
      <editor-content id="editor-content" spellcheck="false" :editor="editor" />
    </v-card-text>
  </v-card>
</template>

<script>
  import tippy from "tippy.js";
  import { Editor, EditorContent, VueRenderer } from "@tiptap/vue-2";
  import StarterKit from "@tiptap/starter-kit";
  import Highlight from "@tiptap/extension-highlight";
  import TextAlign from "@tiptap/extension-text-align";
  import AdvEntity from "~/components/pages/workshop/editor/AdvEntityNode.js";
  import AdvEntityList from "~/components/pages/workshop/editor/AdvEntityList.vue";
  import { mapGetters, mapMutations } from "vuex";

  export default {
    components: {
      EditorContent,
    },
    data: () => ({
      editor: null,
      toolbar_active_tools: [],
      highlight_color: "#74c0fc",
      highlight_color_picker: false,
      highlight_color_picker_colors: [
        ["#74c0fc"],
        ["#8ce99a"],
        ["#faf594"],
        ["#ffc078"],
        ["#ffa8a8"],
      ],
      toolbar_text_format: 0,
    }),
    computed: {
      bold: {
        get() {
          return this.editor.isActive("bold");
        },
        set(value) {},
      },
      italic: {
        get() {
          return this.editor.isActive("italic");
        },
        set(value) {},
      },
      highlight: {
        get() {
          return this.editor.isActive("highlight");
        },
        set(value) {},
      },
      h1: {
        get() {
          return this.editor.isActive("heading", { level: 1 });
        },
        set(value) {},
      },
      h2: {
        get() {
          return this.editor.isActive("heading", { level: 2 });
        },
        set(value) {},
      },
      h3: {
        get() {
          return this.editor.isActive("heading", { level: 3 });
        },
        set(value) {},
      },
      textAlignLeft: {
        get() {
          return this.editor.isActive({ textAlign: "left" });
        },
        set(value) {},
      },
      textAlignCenter: {
        get() {
          return this.editor.isActive({ textAlign: "center" });
        },
        set(value) {},
      },
      textAlignRight: {
        get() {
          return this.editor.isActive({ textAlign: "right" });
        },
        set(value) {},
      },
      textAlignJustify: {
        get() {
          return this.editor.isActive({ textAlign: "justify" });
        },
        set(value) {},
      },
      contentObj() {
        let contentId;
        switch (this.currentTabObject?.type) {
          case this.entityType.CHAPTER:
            contentId = this.getChapter(this.currentTabObject.id).contentId;
            break;
          case this.entityType.MASTERNOTE:
            contentId = this.getMasternote(this.currentTabObject.id).contentId;
            break;
          case this.entityType.CHARACTER:
            contentId = this.getCharacter(this.currentTabObject.id).contentId;
            break;
          case this.entityType.LOCATION:
            contentId = this.getLocation(this.currentTabObject.id).contentId;
            break;
          case this.entityType.ITEM:
            contentId = this.getItem(this.currentTabObject.id).contentId;
            break;
          case this.entityType.ENEMY:
            contentId = this.getEnemy(this.currentTabObject.id).contentId;
            break;
          default:
            break;
        }
        if (contentId) {
          return this.getContentById(contentId);
        }
        return {};
      },
      ...mapGetters({
        getEntities: "adventureData/getEntities",
        getChapter: "adventureData/getChapter",
        getMasternote: "adventureData/getMasternote",
        getCharacter: "adventureData/getCharacter",
        getLocation: "adventureData/getLocation",
        getItem: "adventureData/getItem",
        getEnemy: "adventureData/getEnemy",
        getContentById: "adventureData/getContentById",
        entityType: "adventureData/getEntityType",
        currentTabObject: "tab/getCurrentTabObject",
      }),
    },
    mounted() {
      this.editor = new Editor({
        content: this.contentObj.content,
        extensions: [
          StarterKit,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          ,
          Highlight.configure({ multicolor: true }),
          AdvEntity.configure({
            HTMLAttributes: {
              class: "test",
            },
            suggestion: {
              //Pass an array of filtered suggestions, can be async.
              items: (query) => {
                let items = new Map();
                let keyCounter = 0;
                for (const [key, value] of Object.entries({
                  ...this.getEntities,
                })) {
                  items.set(
                    keyCounter,
                    value
                      .filter((item) =>
                        item.title.toLowerCase().startsWith(query.toLowerCase())
                      )
                      .slice(0, 5)
                  );
                  keyCounter++;
                }
                return items;
              },
              //A render function for the autocomplete popup.
              render: () => {
                let component;
                let popup;

                return {
                  onStart: (props) => {
                    component = new VueRenderer(AdvEntityList, {
                      parent: this,
                      propsData: props,
                    });

                    popup = tippy("body", {
                      getReferenceClientRect: props.clientRect,
                      appendTo: () => document.body,
                      content: component.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: "manual",
                      placement: "bottom-start",
                    });
                  },
                  onUpdate(props) {
                    component.updateProps(props);

                    popup[0].setProps({
                      getReferenceClientRect: props.clientRect,
                    });
                  },
                  onKeyDown(props) {
                    return component.ref?.onKeyDown(props);
                  },
                  onExit() {
                    popup[0].destroy();
                    component.destroy();
                  },
                };
              },
            },
          }),
        ],
      });
      this.editor.on("update", ({ editor }) => {
        this.updateContentForEntity(editor.getHTML());
      });
    },
    methods: {
      updateContentForEntity(content) {
        this.setContent({ id: this.contentObj.id, content: content });
      },
      ...mapMutations("adventureData", ["setContent"]),
    },
    beforeDestroy() {
      this.editor.destroy();
    },
  };
</script>

<style>
  #editor {
    display: flex;
    flex-direction: column;
  }

  #editor-toolbar {
    flex: none;
    width: 100%;
    z-index: 1;
    background-color: #f0f0f0;
  }

  .toolbar-btn {
    width: 24px !important;
    min-width: 40px !important;
    padding: 0 8px !important;
  }
  .toolbar-btn .v-btn__content {
    width: 24px;
    max-width: 24px;
  }
  .toolbar-menu-btn {
    min-width: 24px !important;
    padding: 0px !important;
  }

  .black-font {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  #highlight_color_picker div.v-color-picker__swatch {
    margin: 0;
  }
  #highlight_color_picker div.v-color-picker__color {
    width: 24px;
    height: 24px;
    max-height: 24px;
  }

  #editor-content-wrapper {
    flex: 1;
    padding: 0;
    color: inherit;
  }

  #editor-content {
    background-color: grey;
    position: relative;
    height: 100%;
    width: 100%;
    margin: auto;
    overflow-y: scroll !important;
  }

  #editor-content .ProseMirror {
    outline: 0 !important;
    margin: auto !important;
    padding: 48px;
    min-height: 100%;
    max-height: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 21cm;
    background: white;
  }

  #editor-content .ProseMirror h1 {
    margin-bottom: 24px;
  }
  #editor-content .ProseMirror h2 {
    margin-bottom: 20px;
  }
  #editor-content .ProseMirror h3 {
    margin-bottom: 16px;
  }

  .tool-with-color > span.v-btn__content {
    width: 24px;
    height: -webkit-fill-available;
  }
</style>
