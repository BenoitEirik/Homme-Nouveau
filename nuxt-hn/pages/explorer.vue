<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-center items-center">
      <title-category :name="explorerState.categoryName" />
      <pagination v-if="!explorerState.loading" :pagination="data.pagination" :pageNumber="explorerState.pageNumber" />
      <div v-if="!explorerState.loading" class="w-full h-full flex justify-center flex-wrap">
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
      <pagination v-if="!explorerState.loading" :pagination="data.pagination" :pageNumber="explorerState.pageNumber" />
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
      data: Object
    }
  },
  computed: {
    ...mapState(['explorerState'])
  },
  methods: {
    async fetchMetadata () {
      this.data = await Bridge.getExplorerMetadata({ url: this.explorerState.categoryURL })
    }
  },
  created () {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.explorerLoading,
      (newValue, oldValue) => {
        if (newValue === true) {
          this.fetchMetadata().then(() => {
            this.$store.commit('SET_EXPLORER_LOADING', false)
          })
        }
      }
    )
  },
  mounted () {
    // Get data by watching for first time
    this.fetchMetadata().then(() => {
      this.$store.commit('SET_EXPLORER_LOADING', false)
    })
  },
  activated () {
    this.$nuxt.$emit('back-icon', true)
  },
  beforeDestroy () {
    this.unwatch()
  }
}
</script>
