<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
      <pagination v-if="data.hasOwnProperty('pagination')" :pagination="data.pagination" :pageNumber="explorerState.pageNumber" />
      <div v-if="loadedData" class="p-2 w-full h-full flex justify-center flex-wrap">
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
      <pagination v-if="loadedData" :pagination="data.pagination" :pageNumber="explorerState.pageNumber" />
      <svg-loader v-else color="#b91c1c" />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['explorerState'])
  },
  methods: {
    async fetchMetadata () {
      this.data = await Bridge.getExplorerMetadata({ url: this.explorerState.metadataURL })
    }
  },
  created () {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.explorerState,
      (newValue, oldValue) => {
        if (newValue.metadataURL !== oldValue.metadataURL) {
          this.loadedData = false
          this.fetchMetadata().then(() => {
            this.loadedData = true
          })
        }
      }
    )
  },
  mounted () {
    // Get data by watching for first time
    this.loadedData = false
    this.fetchMetadata().then(() => {
      this.loadedData = true
    })
  },
  activated () {
    this.$nuxt.$emit('back-icon', true)
    this.$nuxt.$emit('category-title', true)
  },
  deactivated () {
    this.$nuxt.$emit('category-title', false)
  },
  beforeDestroy () {
    this.unwatch()
  }
}
</script>
