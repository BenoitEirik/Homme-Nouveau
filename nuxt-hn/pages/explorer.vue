<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
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
      data: Object
    }
  },
  async fetch () {
    const searchParams = new URLSearchParams(window.location.search)
    this.data = await Bridge.getExplorerMetadata({ url: decodeURI(searchParams.get('url')) })
    this.loadedData = true
  },
  methods: {
    async echo (value) {
      const { data } = await Bridge.echo({ value })
      console.log('ConsoleLog: ', String(data.value))
    }
  },
  mounted () {
    this.$nuxt.$emit('back-icon', true)
  }
}
</script>
