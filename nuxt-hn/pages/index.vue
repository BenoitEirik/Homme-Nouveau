<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
      <swiper-a-la-une v-if="loadedData" :primaryArticles="data.primaryArticles" />
      <categories v-if="loadedData" :categories="data.categories" />
      <title-category v-if="loadedData" name="Derniers Articles" />
      <div v-if="loadedData" class="w-full h-full flex justify-center flex-wrap">
        <!-- Derniers articles publié -->
        <article-card
          v-for="article in data.secondaryArticles"
          :key="article.id"
          :id="article.id"
          :url="article.url"
          :img="article.img"
          :title="article.title"
          :detail="article.detail"
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
  components: {
    articleCard,
    SvgLoader,
    Categories
  },
  data () {
    return {
      loadedData: false,
      data: Object
    }
  },
  async fetch () {
    this.data = await Bridge.getHomeMetadata()
    this.loadedData = true
  },
  mounted () {
    this.$nuxt.$emit('back-icon', false)
  }
}
</script>
