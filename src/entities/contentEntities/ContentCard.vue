<script setup lang="ts">
defineProps<{
  title: string,
  text: string,
  author: string
}>()
</script>

<template>
  <div class="col-3 card">
    <h3>{{title}}</h3>
    <p>{{text}}</p>
    <span>{{author}}</span>
  </div>
</template>

<style scoped lang="scss">
  .card {
    margin: .5rem;
    padding: 1rem;
    background: var(--background-color-main);
    & h3 {
      color: var(--text-header-color);
    }
    & span {
      color: var(--text-additional-color);
    }
  }
</style>