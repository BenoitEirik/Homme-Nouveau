<template>
<q-page class="column fit items-center">
  <header v-if="!loading || content !== undefined" class="fit relative-position header">
    <span class="q-px-md q-py-sm text-subtitle1">
      {{ title }}
    </span>
    <q-img :srcset="cover" fit="contain" />
  </header>

  <article v-if="!loading || content !== undefined" v-html="content?.html" class="article-container" />

  <q-spinner color="primary" size="50px" class="col" v-if="loading" />

  <span style="color: red;">{{ error }}</span>
</q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useArticlesStore } from 'src/stores/articles-store';
import { useRoute } from 'vue-router';
import { Article, ArticleContent } from 'src/assets/js/articles';

export default defineComponent({
  setup() {
    const articlesStore = useArticlesStore()
    const loading = ref<boolean>(true)
    const error = ref<string>('')
    const id = Number(useRoute().query.id)
    const content = ref<ArticleContent>()
    const title = ref<string>('')
    const cover = ref<string>('')

    onMounted(async () => {
      content.value = await articlesStore.getArticleContent(id)

      const article = articlesStore.articles.find((article: Article) => article.id === String(id))
      title.value = article?.title || ''
      cover.value = article?.cover || ''

      loading.value = false
    })

    return {
      articlesStore,
      loading,
      id,
      error,
      content,
      cover,
      title
    }
  }
})
</script>

<style scoped lang="scss">
.header span {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-shadow: -1px 0 #B01329, 0 1px #B01329, 1px 0 #B01329, 0 -1px #B01329;
}

.header img {
  max-width: 768px;
}

.article-container {
  max-width: 100%;
  border: 15px solid white;
}
</style>
