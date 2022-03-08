export const state = () => ({
  tabs: [],
  currentTab: null,
});

export const getters = {
  getTabs: (state) => {
    return state.tabs;
  },
  getTabByIndex: (state) => (i) => {
    return state.tabs[i];
  },
  getCurrentTab: (state) => {
    return state.currentTab;
  },
  getCurrentTabObject: (state) => {
    return state.tabs.at(state.currentTab) ?? {};
  },
  getTabById: (state) => (id) => {
    return state.tabs.filter((tab) => tab.id === id);
  },
  getIndexOfTabById: (state) => (id) => {
    return state.tabs.findIndex((tab) => tab.id === id);
  },
};

export const mutations = {
  setCurrentTab(state, index) {
    state.currentTab = index;
  },
  setCurrentTabTitle(state, title) {
    state.tabs.at(state.currentTab).title = title;
  },
  CLEAR_CURRENT_TAB(state) {
    state.currentTab = {};
  },
  ADD_TAB(state, entity) {
    let tab = {
      id: entity.id,
      title: entity.title,
      type: entity.type,
      open: true,
    };

    let exists = state.tabs.some((el) => el.id === tab.id);
    if (!exists) {
      state.tabs.push(tab);
      state.currentTab = state.tabs.length - 1;
    }
  },
  UPDATE_TABS(state, value) {
    state.tabs = value;
  },
  REMOVE_TAB(state, index) {
    for (let i = index; i < state.tabs.length - 1; i++) {
      state.tabs[i] = state.tabs[i + 1];
    }
    state.tabs.splice(state.tabs.length - 1, 1);
  },
};

export const actions = {
  closeAllTabs({ commit }) {
    commit("UPDATE_TABS", []);
    commit("CLEAR_CURRENT_TAB");
  },
  openTab({ commit, getters }, entity) {
    const id = entity.id;
    const indexOfTab = getters.getIndexOfTabById(id);
    if (indexOfTab > -1) {
      commit("setCurrentTab", indexOfTab);
    } else {
      commit("ADD_TAB", entity);
    }
  },
  closeTab({ state, commit }, tabIndex) {
    if (tabIndex < state.currentTab) {
      commit("setCurrentTab", state.currentTab - 1);
    } else if (tabIndex === state.currentTab) {
      if (state.tabs.length > 1) {
        if (tabIndex === state.tabs.length - 1) {
          commit("setCurrentTab", tabIndex - 1);
        } else {
          commit("setCurrentTab", tabIndex);
        }
      } else {
        commit("CLEAR_CURRENT_TAB");
      }
    }
    commit("REMOVE_TAB", tabIndex);
  },
};
