<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-3xl mx-auto max-h-full flex flex-col justify-start items-center">
      <div v-if="loadedData" class="py-4 w-full overflow-y-auto"><!-- WARNING: overflow doesn't work with flex ! And has need height fixed to his parent -->
        <search-card v-for="article in data.articles" :key="article.id" :article="article" />
        <search-pagination v-if="(loadedData && data.hasOwnProperty('pagination')) || loadingMore" :pagination="data.pagination" />
      </div>
      <div
        v-if="!loadedData || loadingMore"
        :class="loadingMore ? 'w-full flex justify-center items-center rounded-t-3xl justify-self-stretch':''"
        :style="loadingMore ? 'box-shadow: rgba(100, 100, 111, 0.2) 0px -7px 29px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;':''"
      >
        <svg-loader color="#b91c1c" />
      </div>
    </div>
  </main>
</template>

<script>
import { Keyboard } from '@capacitor/keyboard'
import searchCard from '~/components/cards/search-card.vue'
import Bridge from '~/plugins/capacitor'

export default {
  components: { searchCard },
  data () {
    return {
      searchString: '',
      loadedData: true,
      loadingMore: false,
      data: Object
    }
  },
  methods: {
    async fetchSearchArticlesMetadata (pageNumber) {
      if (this.searchString === '') {
        return
      }
      Keyboard.hide()

      if (pageNumber === 1) {
        this.loadedData = false
        this.data = await Bridge.getSearchArticlesMetadata({ searchString: this.searchString + '&page=' + String(pageNumber) })
        this.loadedData = true
      } else {
        this.loadingMore = true
        const data = await Bridge.getSearchArticlesMetadata({ searchString: this.searchString + '&page=' + String(pageNumber) })
        const tmp = {
          articles: this.data.articles.concat(data.articles),
          pagination: this.data.pagination
        }
        this.data = tmp
        this.loadingMore = false
      }
    }
  },
  activated () {
    this.$nuxt.$emit('back-icon', true)
    this.$nuxt.$emit('search-icon', false)
    this.$nuxt.$emit('search-bar', true)

    // Get value from input in MyHeader component
    this.$nuxt.$on('getSearchString', (searchString) => {
      this.searchString = searchString
      this.fetchSearchArticlesMetadata(1)
    })
  },
  deactivated () {
    this.$nuxt.$emit('search-icon', true)
    this.$nuxt.$emit('search-bar', false)
  }
}
</script>
