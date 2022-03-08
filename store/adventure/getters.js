const getters = {
  getAdvById: (state) => (id) => {
    return state.adventures.find((adv) => adv.id === id);
  },
  getAdvDataIdByAdvId: (state) => (id) => {
    let adv = state.adventures.find((adv) => adv.id === id);
    return adv.data.advDataId;
  },
};
export default getters;
