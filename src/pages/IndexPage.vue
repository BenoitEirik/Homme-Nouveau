<template>
  <q-page class="column fit items-center">
    <ArticleCard
      v-for="article in articlesStore.articles"
      :key="article.id"
      :data="article"
      @click="$router.push({ path: '/article', query: { id: article.id } })"
    />

    <q-spinner color="primary" size="50px" class="col" v-if="loading" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useArticlesStore } from 'src/stores/articles-store';
import ArticleCard from 'src/components/ArticleCard.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticleCard,
  },
  setup() {
    const articlesStore = useArticlesStore();
    const loading = ref<boolean>(true);
    const error = ref<string>('');

    onMounted(async () => {
      if (articlesStore.articles.length > 0) {
        loading.value = false;
        return;
      }

      await articlesStore.getListArticles();
      loading.value = false;
    });

    return {
      articlesStore,
      error,
      loading,
    };
  },
});
</script>
