<template>
  <q-page class="column fit">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <ArticleSmallCard
        :data="article"
        v-for="(article, index) in articles"
        :key="index"
        class="caption"
      />

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { Article } from 'src/assets/js/articles';
import ArticleSmallCard from 'src/components/ArticleSmallCard.vue';
import { useSearchStore as searchStore } from 'src/stores/search-store';
import { ref } from 'vue';

const articles = ref([] as Article[]);

async function onLoad(index: number, done: any) {
  await searchStore().getListArticles();
  articles.value.push(...searchStore().articles);
  done();
}
</script>
