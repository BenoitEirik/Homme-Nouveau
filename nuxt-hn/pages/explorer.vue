<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
      <title-category v-if="loadedData" :name="this.categoryName" />
      <pagination v-if="loadedData" :pagination="data.pagination" :pageNumber="pageNumber" />
      <div v-if="loadedData" class="w-full h-full flex justify-center flex-wrap">
        <!-- Articles de la catégorie x à la page y -->
        <article-card
          v-for="article in data.articles"
          :key="article.id"
          :id="article.id"
          :url="article.url"
          :img="article.img"
          :title="article.title"
          :detail="article.detail"
          :description="article.description"
        />
      </div>
      <pagination v-if="loadedData" :pagination="data.pagination" :pageNumber="pageNumber" />
      <svg-loader v-else color="#b91c1c" />
    </div>
  </main>
</template>

<script>
import articleCard from '~/components/cards/article-card.vue'
import SvgLoader from '~/components/svg-loader.vue'
import Bridge from '~/plugins/capacitor'

export default {
  components: { articleCard, SvgLoader },
  data () {
    return {
      loadedData: false,
      data: Object,
      url: String,
      categoryName: String,
      pageNumber: Number // Numéro actuel de la page d'articles
    }
  },
  async fetch () {
    const searchParams = new URLSearchParams(window.location.search)
    this.url = decodeURI(searchParams.get('url'))
    this.categoryName = searchParams.get('categoryName')
    this.pageNumber = Number(searchParams.get('pageNumber'))
    this.data = await Bridge.getExplorerMetadata({ url: this.url })
    this.loadedData = true
  },
  methods: {
    // Method used in pagination component to load new articles
    async getNextArticles (newURL, newPageNumber) {
      this.loadedData = false
      this.url = newURL
      this.pageNumber = newPageNumber
      this.data = await Bridge.getExplorerMetadata({ url: this.url })
      this.loadedData = true
    }
  },
  mounted () {
    this.$nuxt.$emit('back-icon', true)
  }
}
</script>
