import { nanoid } from "nanoid";

const actions = {
  // CRUD
  async readAdventureDataByID({ commit, getters }, id) {
    const adventureDataDoc = await this.$fireStore
      .collection("adventureData")
      .doc(id)
      .get();
    commit("SET_ADVENTURE_DATA", adventureDataDoc);
    return getters["getAdvData"];
  },

  async createAdventureData({ dispatch }, advId) {
    const adventureData = {
      advId: advId,
      collections: {
        chapters: [
          {
            id: nanoid(),
            contentId: "_initialProlog",
            title: "Prolog",
            description: "Short Description...",
          },
          {
            id: nanoid(),
            contentId: "_initialChapter1",
            title: "Chapter 1",
            description: "Short Description...",
          },
        ],
        masternotes: [
          {
            id: nanoid(),
            contentId: "_initialMasternote1",
            title: "Masternote 1",
          },
        ],
        characters: [
          {
            id: nanoid(),
            contentId: "_initialCharacter1",
            title: "Character 1",
            profession: "",
            image: "",
            attributes: [],
            skills: [],
          },
        ],
        locations: [
          {
            id: nanoid(),
            contentId: "_initialLocation1",
            title: "Location 1",
            location: "",
            image: "",
          },
        ],
        items: [
          {
            id: nanoid(),
            contentId: "_initialItem1",
            title: "Item 1",
            type: "",
            stats: [],
            image: "",
          },
        ],
        enemies: [
          {
            id: nanoid(),
            contentId: "_initialEnemy1",
            title: "Enemy 1",
            image: "",
            attributes: [],
            skills: [],
          },
        ],
      },
    };
    const content = [
      {
        id: "_initialProlog",
        content: `<p>
        🎉 Welcome to your new adventure... You can Mention your entities with '@' for instance <span adv-entity entity-type="0" entity-id="${adventureData.collections.masternotes[0].id}"></span>
        </p>`,
      },
      {
        id: "_initialChapter1",
        content: `<p>This is the first chapter of this adventure</p>`,
      },
      {
        id: "_initialMasternote1",
        content: `<p>
              Masternote description goes here...
            </p>`,
      },
      {
        id: "_initialCharacter1",
        content: `<p>
              Character description goes here...
            </p>`,
      },
      {
        id: "_initialLocation1",
        content: `<p>
              Location description goes here...
            </p>`,
      },
      {
        id: "_initialItem1",
        content: `<p>
              Item description goes here...
            </p>`,
      },
      {
        id: "_initialEnemy1",
        content: `<p>
              Enemy description goes here...
            </p>`,
      },
    ];

    let adventureDataDoc = await this.$fireStore
      .collection("adventureData")
      .add(adventureData);
    content.forEach((entry) => {
      dispatch("createContent", {
        advDataId: adventureDataDoc.id,
        contentId: entry.id,
        content: entry.content,
      });
    });
    return adventureDataDoc.id;
  },

  async updateAdventureData({ state, dispatch }) {
    const advDataRef = await this.$fireStore
      .collection("adventureData")
      .doc(state.adventureData.id);
    await this.$fireStore.runTransaction(async (transaction) => {
      await transaction.update(advDataRef, state.adventureData.data);
      await dispatch("updateAllContent", transaction);
    });
  },

  async deleteAdventureData({ commit, dispatch }, id) {
    const advDataRef = await this.$fireStore
      .collection("adventureData")
      .doc(id);
    await this.$fireStore.runTransaction(async (transaction) => {
      await dispatch("deleteAllContent", {
        advId: id,
        transaction: transaction,
      });
      await transaction.delete(advDataRef);
    });
    commit("removeAdventureData");
  },

  // CONTENT
  async readContentById({ state, commit }, contentId) {
    // if not already existing in the state.content then fetch from db
    if (!state.content.find((c) => c.id === contentId)) {
      const contentDoc = await this.$fireStore
        .collection("adventureData")
        .doc(state.adventureData.id)
        .collection("content")
        .doc(contentId)
        .get();
      commit("ADD_CONTENT", {
        id: contentDoc.id,
        content: contentDoc.data().content,
      });
      return true;
    }
    return false;
  },

  async createContentId({ state, commit }) {
    const contentDoc = await this.$fireStore
      .collection("adventureData")
      .doc(state.adventureData.id)
      .collection("content")
      .doc();
    commit("ADD_CONTENT", {
      id: contentDoc.id,
      content: `<p> your text goes here... </p>`,
    });
    return contentDoc.id;
  },

  async createContent({ commit }, { advDataId, contentId, content }) {
    await this.$fireStore
      .collection("adventureData")
      .doc(advDataId)
      .collection("content")
      .doc(contentId)
      .set({ content: content });
  },

  async updateAllContent({ commit, state }, transaction) {
    state.content.forEach(async (entry) => {
      const contentRef = await this.$fireStore
        .collection("adventureData")
        .doc(state.adventureData.id)
        .collection("content")
        .doc(entry.id);
      await transaction.set(contentRef, { content: entry.content });
    });
  },

  async deleteAllContent({ commit, state }, { advId, transaction }) {
    const contentDocs = await this.$fireStore
      .collection("adventureData")
      .doc(advId)
      .collection("content")
      .get();
    contentDocs.forEach(async (contentDoc) => {
      const contentRef = await this.$fireStore
        .collection("adventureData")
        .doc(advId)
        .collection("content")
        .doc(contentDoc.id);
      await transaction.delete(contentRef);
    });
  },
};
export default actions;
