<template>
  <main style="flex:2" class="overflow-y-auto">
    <div class="max-w-7xl mx-auto min-h-full flex flex-col justify-start items-center">
      <div class="w-full flex border-b border-gray-300">
        <input
          type="text"
          v-model="searchString"
          placeholder="Rechercher..."
          @keyup.enter="fetchSearchArticlesMetadata()"
          class="w-full p-4"
        />
        <btn-cancel v-if="searchString !== ''" />
      </div>
      <div v-if="loadedData" class="w-full h-full"><!-- WARNING: overflow doesn't work with flex ! And has need height fixed to his parent -->
        <search-card v-for="article in data.articles" :key="article.id" :article="article" />
      </div>
      <div v-else class="h-full flex justify-center items-center">
        <svg-loader color="#b91c1c" />
      </div>
    </div>
  </main>
</template>

<script>
import { Keyboard } from '@capacitor/keyboard'
import searchCard from '~/components/cards/search-card.vue'
import Bridge from '~/plugins/capacitor'
import BtnCancel from '~/components/buttons/btn-cancel.vue'

export default {
  components: { searchCard, BtnCancel },
  data () {
    return {
      searchString: '',
      loadedData: true,
      data: Object
    }
  },
  methods: {
    async fetchSearchArticlesMetadata () {
      if (this.searchString === '') {
        return
      }
      Keyboard.hide()
      this.loadedData = false
      this.data = await Bridge.getSearchArticlesMetadata({ searchString: this.searchString })
      this.loadedData = true
    },
    clearInput () {
      this.searchString = ''
    }
  },
  activated () {
    this.$nuxt.$emit('back-icon', true)
    this.$nuxt.$emit('search-icon', false)
  },
  deactivated () {
    this.$nuxt.$emit('search-icon', true)
  }
}
</script>
