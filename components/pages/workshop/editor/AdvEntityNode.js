import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import AdvEntity from "~/components/pages/workshop/editor/AdvEntity.vue";
import AdvEntityInDialog from "~/components/pages/workshop/editor/AdvEntityInDialog.vue";

export default Node.create({
  name: "advEntity",
  group: "inline",
  inline: true,
  atom: true,
  selectable: false,

  defaultOptions: {
    editable: true, // controlls which vue component should be visible
    HTMLAttributes: {
      class: "advEntity",
    },
    suggestion: {
      char: "@", //The character that triggers the autocomplete popup.
      allowSpaces: false, //Allows or disallows spaces in suggested items.
      startOfLine: false, //Trigger the autocomplete popup at the start of a line only.
      decorationTag: "span", //The HTML tag that should be rendered for the suggestion.
      decorationClass: "suggestion", //A CSS class that should be added to the suggestion.
      //Executed when a suggestion is selected.
      command: ({ editor, range, props }) => {
        editor
          .chain()
          .focus()
          .insertContentAt(range, [
            {
              type: "advEntity",
              attrs: props,
            },
            {
              type: "text",
              text: " ",
            },
          ])
          .run();
      },
      allow: ({ editor, range }) => {
        return editor.can().insertContentAt(range, { type: "advEntity" });
      },
    },
  },

  addAttributes() {
    return {
      entityType: {
        default: undefined,
        parseHTML: (element) => {
          return {
            entityType: element.getAttribute("entity-type"),
          };
        },
        renderHTML: (attributes) => {
          if (!attributes.entityType) {
            return {};
          }
          return {
            "entity-type": attributes.entityType,
          };
        },
      },
      entityId: {
        default: undefined,
        parseHTML: (element) => {
          return {
            entityId: element.getAttribute("entity-id"),
          };
        },
        renderHTML: (attributes) => {
          if (!attributes.entityId) {
            return {};
          }
          return {
            "entity-id": attributes.entityId,
          };
        },
      },
      entityTitle: {
        default: undefined,
        parseHTML: (element) => {
          return "";
        },
        renderHTML: (attributes) => {
          return {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[adv-entity]",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "adv-entity": "",
        "entity-type": node.attrs.entityType,
        "entity-id": node.attrs.entityId,
      }),
      `@${node.attrs.entityTitle}`,
    ];
  },

  renderText({ node }) {
    return `@${node.attrs.entityTitle}`;
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },

  addNodeView() {
    if (this.options.editable) {
      return VueNodeViewRenderer(AdvEntity);
    } else {
      return VueNodeViewRenderer(AdvEntityInDialog);
    }
  },
});
