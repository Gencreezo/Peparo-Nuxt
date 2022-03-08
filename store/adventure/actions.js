const actions = {
  // CRUD (CREATE, READ, UPDATE, DELETE)
  async readAdventures({ commit }) {
    const user = this.$fireAuth.currentUser;
    const adventureCollection = await this.$fireStore
      .collection("adventures")
      .where("author", "==", user.uid)
      .get();
    let adventures = [];
    adventureCollection.forEach((adventure) => {
      adventures.push({ id: adventure.id, data: adventure.data() });
    });
    commit("SET_ADVENTURES", adventures);
  },

  async readAdventure({ commit }, adventureId) {
    const adventureCollection = await this.$fireStore
      .collection("adventures")
      .doc(adventureId)
      .get();
    let adventure = {
      id: adventureCollection.id,
      data: adventureCollection.data(),
    };
    commit("ADD_ADVENTURE", adventure);
    return adventure;
  },

  async createAdventure({ commit, dispatch }, newAdventure) {
    const user = this.$fireAuth.currentUser;
    newAdventure.author = user.uid;
    newAdventure.advDataId = "";
    const newAdventureDoc = await this.$fireStore
      .collection("adventures")
      .add(newAdventure);
    const newAdvDataId = await dispatch(
      "adventureData/createAdventureData",
      newAdventureDoc.id,
      { root: true }
    );
    newAdventureDoc.update({ advDataId: newAdvDataId });
    newAdventure.advDataId = newAdvDataId;
    commit("ADD_ADVENTURE", {
      id: newAdventureDoc.id,
      data: { ...newAdventure },
    });
  },

  async updateAdventure({ commit }, { adventure }) {
    let adv = { ...adventure };
    await this.$fireStore.collection("adventures").doc(adv.id).update(adv.data);
    commit("setAdventure", adv);
  },

  async deleteAdventure(
    { commit, dispatch, state },
    { adventureId, advDataId }
  ) {
    await dispatch("adventureData/deleteAdventureData", advDataId, {
      root: true,
    });
    await this.$fireStore.collection("adventures").doc(adventureId).delete();
    commit("REMOVE_ADVENTURE", adventureId);
  },
};
export default actions;
