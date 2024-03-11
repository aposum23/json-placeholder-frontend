<script setup lang="ts">
import {ref, watch} from 'vue';
import {useContentStore} from "@/shared/strores/contentStore.ts";
import {storeToRefs} from "pinia";

const filterInput = ref<string>('');
const showMatches = ref<boolean>(false);
const contentStore = useContentStore();
const { setFilterValue, filterData } = contentStore;
const { authors } = storeToRefs(contentStore);
const matches = ref<{id: number, name: string}[]>([]);

watch(
    () => filterInput.value,
    (newValue) => {
        if (newValue) {
          const inputMatch = authors.value?.filter(user => user.name.includes(newValue));
          if (inputMatch) matches.value = inputMatch;
        }
        else {
          matches.value = [];
        }
        showMatches.value = !matches.value.find(user => user.name === newValue) && !!newValue;
        setFilterValue(newValue);
    }
);

const setSelectedValue = (value: string) => {
  filterInput.value = value
  showMatches.value = false;
}
</script>

<template>
    <div class="col-md-5 col-11 position-relative filter">
      <div class="d-flex">
        <button class="search-button" @click="filterData"><i class="bi bi-search"></i></button>
        <input
            class="flex-grow-1 input-field"
            type="text" v-model="filterInput"
            placeholder="Filter by author..."
        />
      </div>
      <div class="w-100 position-absolute autocomplete-list" v-show="showMatches">
        <span v-if="matches.length === 0">No matches :(</span>
        <ul v-if="matches.length !== 0">
          <template v-for="author in matches">
            <li @click="setSelectedValue(author.name)">{{author.name}}</li>
          </template>
        </ul>
      </div>
    </div>
</template>

<style scoped lang="scss">
.search-button {
  border: 1px solid var(--border-color);
  background-color: var(--background-color-main);
}

.input-field {
  border: 1px solid var(--border-color);
}

.autocomplete-list {
  margin-top: 3px;
  height: 8rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color-main);
  box-shadow: 1px 1px 5px var(--shadow-color);
  overflow-y: scroll;
  z-index: 100;

  & span {
    margin: .5rem;
    color: var(--text-additional-color);
    font-size: 1.5rem;
  }
  & ul {
    list-style-type: none;
  }
}
</style>