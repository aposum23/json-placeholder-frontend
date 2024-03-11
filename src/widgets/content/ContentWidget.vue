<script setup lang="ts">
import ContentCard from "@/entities/contentEntities/ContentCard.vue";
import {onMounted} from "vue";
import {useContentStore} from "@/shared/strores/contentStore.ts";
import { storeToRefs } from "pinia";

const contentStore = useContentStore();
const { getData } = contentStore;
const { contentItems } = storeToRefs(contentStore);

onMounted(() => {
  getData();
})
</script>

<template>
  <div class="row justify-content-center">
    <template v-for="item in contentItems">
      <ContentCard :title="item.title" :author="item.author" :text="item.body" />
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>