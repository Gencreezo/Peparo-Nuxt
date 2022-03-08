const getters = {
  // General
  getAdvData: (state) => {
    return state.adventureData;
  },
  getChapter: (state) => (id) => {
    return state.adventureData.data.collections.chapters.find(
      (chapter) => chapter.id === id
    );
  },
  getMasternote: (state) => (id) => {
    return state.adventureData.data.collections.masternotes.find(
      (masternote) => masternote.id === id
    );
  },
  getMasternoteTitle: (state) => (id) => {
    return (
      state.adventureData.data.collections.masternotes.find(
        (masternote) => masternote.id === id
      )?.title ?? ""
    );
  },
  getCharacter: (state) => (id) => {
    return state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
  },
  getLocation: (state) => (id) => {
    return state.adventureData.data.collections.locations.find(
      (location) => location.id === id
    );
  },
  getItem: (state) => (id) => {
    return state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
  },
  getEnemy: (state) => (id) => {
    return state.adventureData.data.collections.enemies.find(
      (enemie) => enemie.id === id
    );
  },
  getCollections: (state) => {
    return state.adventureData.data.collections;
  },
  getEntities: (state) => {
    return {
      masternotes: state.adventureData.data.collections.masternotes,
      characters: state.adventureData.data.collections.characters,
      locations: state.adventureData.data.collections.locations,
      items: state.adventureData.data.collections.items,
      enemies: state.adventureData.data.collections.enemies,
    };
  },
  getChapters: (state) => {
    return state.adventureData.data.collections.chapters;
  },
  getMasternotes: (state) => {
    return state.adventureData.data.collections.masternotes;
  },
  getCharacters: (state) => {
    return state.adventureData.data.collections.characters;
  },
  getLocations: (state) => {
    return state.adventureData.data.collections.locations;
  },
  getItems: (state) => {
    return state.adventureData.data.collections.items;
  },
  getEnemies: (state) => {
    return state.adventureData.data.collections.enemies;
  },

  // Content
  getContentById: (state) => (id) => {
    return state.content.find((c) => c.id === id);
  },
  getContentTextById: (state) => (id) => {
    return state.content.find((c) => c.id === id)?.content;
  },

  // entityType
  getEntityType: (state) => {
    return state.entityType;
  },
  getEntityListByType: (state) => (type) => {
    switch (type) {
      case "CHAPTER":
        return state.adventureData.data.collections.chapters;
        break;
      case "MASTERNOTE":
        return state.adventureData.data.collections.masternotes;
        break;
      case "CHARACTER":
        return state.adventureData.data.collections.characters;
        break;
      case "LOCATION":
        return state.adventureData.data.collections.locations;
        break;
      case "ITEM":
        return state.adventureData.data.collections.items;
        break;
      case "ENEMY":
        return state.adventureData.data.collections.enemies;
        break;
      default:
        break;
    }
  },
};

export default getters;
