const mutations = {
  // AdventureData
  SET_ADVENTURE_DATA(state, adventureDataDoc) {
    state.adventureData.id = adventureDataDoc.id;
    state.adventureData.data = adventureDataDoc.data();
  },

  // Chapters
  createChapter(state, chapter) {
    state.adventureData.data.collections.chapters.push(chapter);
  },
  removeChapter(state, id) {
    const index = state.adventureData.data.collections.chapters.findIndex(
      (chapter) => chapter.id === id
    );
    state.adventureData.data.collections.chapters.splice(index, 1);
  },
  setChapterTitle(state, { id, title }) {
    const chapter = state.adventureData.data.collections.chapters.find(
      (chapter) => chapter.id === id
    );
    chapter.title = title;
  },
  setChapterDescription(state, { id, description }) {
    const chapter = state.adventureData.data.collections.chapters.find(
      (chapter) => chapter.id === id
    );
    chapter.description = description;
  },

  // Masternotes
  createMasternote(state, masternote) {
    state.adventureData.data.collections.masternotes.push(masternote);
  },
  removeMasternote(state, id) {
    const index = state.adventureData.data.collections.masternotes.findIndex(
      (masternote) => masternote.id === id
    );
    state.adventureData.data.collections.masternotes.splice(index, 1);
  },
  setMasternoteTitle(state, { id, title }) {
    const masternote = state.adventureData.data.collections.masternotes.find(
      (masternote) => masternote.id === id
    );
    masternote.title = title;
  },

  // Characters
  createCharacter(state, character) {
    state.adventureData.data.collections.characters.push(character);
  },
  removeCharacter(state, id) {
    const index = state.adventureData.data.collections.characters.findIndex(
      (character) => character.id === id
    );
    state.adventureData.data.collections.characters.splice(index, 1);
  },
  setCharacterTitle(state, { id, title }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.title = title;
  },
  setCharacterProfession(state, { id, profession }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.profession = profession;
  },
  setCharacterImage(state, { id, image }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.image = image;
  },
  setCharacterAttributeText(state, { id, attrIndex, text }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.attributes[attrIndex].text = text;
  },
  setCharacterAttributeValue(state, { id, attrIndex, value }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.attributes[attrIndex].value = value;
  },
  setCharacterSkillText(state, { id, skillIndex, text }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.skills[skillIndex].text = text;
  },
  setCharacterSkillValue(state, { id, skillIndex, value }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.skills[skillIndex].value = value;
  },
  addCharacterAttribute(state, id) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.attributes.push({ text: "", value: "" });
  },
  addCharacterSkill(state, id) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.skills.push({ text: "", value: "" });
  },
  removeCharacterAttribute(state, { id, attrIndex }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.attributes.splice(attrIndex, 1);
  },
  removeCharacterSkill(state, { id, skillIndex }) {
    const character = state.adventureData.data.collections.characters.find(
      (character) => character.id === id
    );
    character.skills.splice(skillIndex, 1);
  },

  // Locations
  createLocation(state, location) {
    state.adventureData.data.collections.locations.push(location);
  },
  removeLocation(state, id) {
    const index = state.adventureData.data.collections.locations.findIndex(
      (location) => location.id === id
    );
    state.adventureData.data.collections.locations.splice(index, 1);
  },
  setLocationTitle(state, { id, title }) {
    const location = state.adventureData.data.collections.locations.find(
      (location) => location.id === id
    );
    location.title = title;
  },
  setLocationLocation(state, { id, location }) {
    state.adventureData.data.collections.locations.find(
      (location) => location.id === id
    ).location = location;
  },
  setLocationImage(state, { id, image }) {
    const location = state.adventureData.data.collections.locations.find(
      (location) => location.id === id
    );
    location.image = image;
  },
  // Items
  createItem(state, item) {
    state.adventureData.data.collections.items.push(item);
  },
  removeItem(state, id) {
    const index = state.adventureData.data.collections.items.findIndex(
      (item) => item.id === id
    );
    state.adventureData.data.collections.items.splice(index, 1);
  },
  setItemTitle(state, { id, title }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.title = title;
  },
  setItemType(state, { id, type }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.type = type;
  },
  setItemStatText(state, { id, statIndex, text }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.stats[statIndex].text = text;
  },
  setItemStatValue(state, { id, statIndex, value }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.stats[statIndex].value = value;
  },
  setItemImage(state, { id, image }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.image = image;
  },
  addItemStat(state, id) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.stats.push({ text: "", value: "" });
  },
  removeItemStat(state, { id, statIndex }) {
    const item = state.adventureData.data.collections.items.find(
      (item) => item.id === id
    );
    item.stats.splice(statIndex, 1);
  },

  // Enemies
  createEnemy(state, enemy) {
    state.adventureData.data.collections.enemies.push(enemy);
  },
  removeEnemy(state, id) {
    const index = state.adventureData.data.collections.enemies.findIndex(
      (enemy) => enemy.id === id
    );
    state.adventureData.data.collections.enemies.splice(index, 1);
  },
  setEnemyTitle(state, { id, title }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.title = title;
  },
  setEnemyProfession(state, { id, profession }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.profession = profession;
  },
  setEnemyImage(state, { id, image }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.image = image;
  },
  setEnemyAttributeText(state, { id, attrIndex, text }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.attributes[attrIndex].text = text;
  },
  setEnemyAttributeValue(state, { id, attrIndex, value }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.attributes[attrIndex].value = value;
  },
  setEnemySkillText(state, { id, skillIndex, text }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.skills[skillIndex].text = text;
  },
  setEnemySkillValue(state, { id, skillIndex, value }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.skills[skillIndex].value = value;
  },
  addEnemyAttribute(state, id) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.attributes.push({ text: "", value: "" });
  },
  addEnemySkill(state, id) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.skills.push({ text: "", value: "" });
  },
  removeEnemyAttribute(state, { id, attrIndex }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.attributes.splice(attrIndex, 1);
  },
  removeEnemySkill(state, { id, skillIndex }) {
    const enemy = state.adventureData.data.collections.enemies.find(
      (enemy) => enemy.id === id
    );
    enemy.skills.splice(skillIndex, 1);
  },

  // Util
  removeAdventureData(state) {
    state.adventureData = {
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
    };
    state.content = [];
  },

  // Content
  setContent(state, { id, content }) {
    state.content.find((c) => c.id === id).content = content;
  },
  ADD_CONTENT(state, { id, content }) {
    state.content.push({ id: id, content: content });
  },
};
export default mutations;
