export default () => ({
  adventureData: {
    id: "",
    data: {
      advId: "",
      collections: {
        chapters: [],
        masternotes: [],
        characters: [],
        locations: [],
        items: [],
        enemies: [],
      },
    },
  },
  content: [],
  entityType: {
    CHAPTER: "CHAPTER",
    MASTERNOTE: "MASTERNOTE",
    CHARACTER: "CHARACTER",
    LOCATION: "LOCATION",
    ITEM: "ITEM",
    ENEMY: "ENEMY",
  },
});
