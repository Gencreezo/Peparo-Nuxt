export const state = () => ({
  currentPage: null,
});

export const getters = {
  getCurrentPage: (state) => {
    return state.currentPage;
  },
};

export const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};
