<template>
  <div class="items">
    <button
      class="item"
      :class="{
        'is-selected':
          index === selectedEntity.index && selectedEntity.type === 0,
      }"
      v-for="(item, index) in items.get(0)"
      :key="'masternote' + index"
      @click="selectItem('0', index)"
    >
      {{ item.title }}
    </button>
    <button
      class="item"
      :class="{
        'is-selected':
          index === selectedEntity.index && selectedEntity.type === 1,
      }"
      v-for="(item, index) in items.get(1)"
      :key="'character' + index"
      @click="selectItem('1', index)"
    >
      {{ item.title }}
    </button>
    <button
      class="item"
      :class="{
        'is-selected':
          index === selectedEntity.index && selectedEntity.type === 2,
      }"
      v-for="(item, index) in items.get(2)"
      :key="'location' + index"
      @click="selectItem('2', index)"
    >
      {{ item.title }}
    </button>
    <button
      class="item"
      :class="{
        'is-selected':
          index === selectedEntity.index && selectedEntity.type === 3,
      }"
      v-for="(item, index) in items.get(3)"
      :key="'item' + index"
      @click="selectItem('3', index)"
    >
      {{ item.title }}
    </button>
    <button
      class="item"
      :class="{
        'is-selected':
          index === selectedEntity.index && selectedEntity.type === 4,
      }"
      v-for="(item, index) in items.get(4)"
      :key="'enemy' + index"
      @click="selectItem('4', index)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    props: {
      items: {
        type: Map,
        required: true,
      },

      command: {
        type: Function,
        required: true,
      },
    },

    data() {
      return {
        selectedEntity: {
          type: this.firstItem(),
          index: 0,
        },
      };
    },
    computed: {
      ...mapGetters({
        masternoteTitle: "adventureData/getMasternoteTitle",
      }),
    },
    watch: {
      items() {
        this.selectedEntity = {
          type: this.firstItem(),
          index: 0,
        };
      },
    },

    methods: {
      firstItem() {
        for (let [key, value] of this.items) {
          if (value.length > 0) {
            return key;
          }
        }
        return 0;
      },

      onKeyDown({ event }) {
        if (event.key === "ArrowUp") {
          this.upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          this.downHandler();
          return true;
        }

        if (event.key === "Enter") {
          this.enterHandler();
          return true;
        }

        if (event.key === "Tab") {
          this.enterHandler();
          return true;
        }

        return false;
      },

      upHandler() {
        if (
          (this.selectedEntity.type != 0 || this.selectedEntity.index != 0) &&
          this.selectedEntity.type != this.firstItem()
        ) {
          if (this.selectedEntity.index == 0) {
            this.selectedEntity.type--;
            this.selectedEntity.index =
              this.items.get(this.selectedEntity.type).length - 1;
          } else {
            this.selectedEntity.index--;
          }
        }
      },

      downHandler() {
        if (
          this.items.size - 1 != this.selectedEntity.type ||
          this.items.get(this.selectedEntity.type).length - 1 !=
            this.selectedEntity.index
        ) {
          if (
            this.items.get(this.selectedEntity.type).length - 1 ==
            this.selectedEntity.index
          ) {
            this.selectedEntity.type++;
            this.selectedEntity.index = 0;
          } else {
            this.selectedEntity.index++;
          }
        }
      },

      enterHandler() {
        this.selectItem(this.selectedEntity.type, this.selectedEntity.index);
      },

      selectItem(type, index) {
        if (typeof type === "string") {
          type = parseInt(type);
        }
        const entityList = this.items.get(type);
        const entity = entityList[index];
        this.command({
          entityType: type.toString(),
          entityId: entity.id,
          entityTitle: this.masternoteTitle(entity.id),
        });
      },
    },
  };
</script>

<style lang="scss">
  .items {
    position: relative;
    border-radius: 0.25rem;
    background: white;
    color: rgba(black, 0.8);
    overflow: hidden;
    font-size: 0.9rem;
    font-family: "Roboto", sans-serif;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  .item {
    display: block;
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    padding: 0.2rem 0.5rem;

    &.is-selected,
    &:hover {
      color: #1976d2;
      background: rgba(#1976d2, 0.1);
    }
  }
</style>
