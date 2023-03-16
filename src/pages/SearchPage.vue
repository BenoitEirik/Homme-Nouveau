<template>
  <q-page class="column fit">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <ArticleSmallCard
        :data="articleStore().articles[0]"
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
import ArticleSmallCard from 'src/components/ArticleSmallCard.vue';
import { useArticlesStore as articleStore } from 'src/stores/articles-store';
import { ref } from 'vue';

const articles = ref([{}, {}, {}, {}, {}, {}, {}]);

function onLoad(index: number, done: any) {
  setTimeout(() => {
    articles.value.splice(0, 0, {}, {}, {}, {}, {}, {}, {});
    done();
  }, 2000);
}
</script>
