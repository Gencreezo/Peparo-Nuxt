const mutations = {
  SET_ADVENTURES(state, adventures) {
    state.adventures = adventures;
  },
  ADD_ADVENTURE(state, adventure) {
    state.adventures.push(adventure);
  },
  REMOVE_ADVENTURE(state, id) {
    let index = state.adventures.findIndex((adv) => adv.id === id);
    state.adventures.splice(index, 1);
  },
  setAdventure(state, updatedAdv) {
    const adventure = state.adventures.find((adv) => adv.id === updatedAdv.id);
    adventure.data = updatedAdv.data;
  },
  removeAdventures(state) {
    state.adventures = [];
  },
};
export default mutations;
