<script setup lang="ts">
import {ref} from 'vue';

const filterInput = ref<string>();
</script>

<template>
    <div class="col-5 position-relative">
      <div class="d-flex">
        <button class="search-button"><i class="bi bi-search"></i></button>
        <input class="flex-grow-1 input-field" type="text" v-model="filterInput" placeholder="Filter by author..."/>
      </div>
      <div class="w-100 position-absolute autocomplete-list">
        <span>No matches :(</span>
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
  z-index: 100;

  & span {
    margin: .5rem;
    color: var(--text-additional-color);
    font-size: 1.5rem;
  }
}
</style>