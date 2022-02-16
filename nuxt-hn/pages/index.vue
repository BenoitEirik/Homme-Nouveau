<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full  flex justify-center items-center">
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
      <img v-else src="@/assets/loader/rolling.gif">
    </div>
  </main>
</template>

<script>
import articleCard from '~/components/cards/article-card.vue'
import Bridge from '~/plugins/capacitor'

export default {
  components: { articleCard },
  data () {
    return {
      loaded: false,
      articles: Object
    }
  },
  methods: {
    async fetchArticles () {
      this.articles = await Bridge.getHomeMetadata()
      this.loaded = true
    }
  },
  mounted () {
    this.fetchArticles()
  }
}
</script>
