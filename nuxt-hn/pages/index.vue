<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
      <categories />
      <div v-if="loaded" class="w-full h-full flex justify-center flex-wrap">
        <article-card
          v-for="article in articles.primaryArticles"
          :key="'p' + String(article.id)"
          :id="article.id"
          :url="article.url"
          :img="article.img"
          :title="article.title"
          :description="article.description"
        />
        <article-card
          v-for="article in articles.secondaryArticles"
          :key="article.id"
          :id="article.id"
          :url="article.url"
          :img="article.img"
          :title="article.title"
          :description="article.description"
        />
      </div>
      <svg-loader v-else color="#b91c1c" />
    </div>
  </main>
</template>

<script>
import articleCard from '~/components/cards/article-card.vue'
import Categories from '~/components/categories.vue'
import SvgLoader from '~/components/svg-loader.vue'
import Bridge from '~/plugins/capacitor'

export default {
  components: { articleCard, SvgLoader, Categories },
  data () {
    return {
      loaded: false,
      articles: Object
    }
  },
  async fetch () {
    this.articles = await Bridge.getHomeMetadata()
    this.loaded = true
  },
  mounted () {
    this.$nuxt.$emit('back-icon', false)
  }
}
</script>
