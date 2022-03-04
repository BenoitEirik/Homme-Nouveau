<template>
  <nav style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
    <div class="relative max-w-7xl mx-auto mt-8 p-3 sm:px-6 lg:px-8 flex justify-center items-center">
      <btn-back class="absolute left-0" />
      <img src="@/assets/logo/logo-large.png" class="h-9" />
      <btn-search class="absolute right-0" />
    </div>
    <div v-show="displaySearchBar" class="relative mx-auto p-3 max-w-7xl flex">
      <input
        ref="inputSearchBar"
        type="text"
        placeholder="Rechercher..."
        v-model="searchString"
        @keyup.enter="setSearchString()"
        class="pl-4 pr-12 w-full p-2 rounded-full border border-red-100 focus:border-red-700"
      />
      <btn-cancel v-if="searchString !== ''" class="absolute top-5 right-6" />
    </div>
    <div v-if="displayWordList" class="w-full max-w-7xl flex justify-start overflow-x-auto border-x-8 border-white">
      <div
        v-for="w in wordList.words"
        :key="w.id"
      >
        <button
          @click="searchString = w.word; setSearchString()"
          class="my-2 mx-1 p-2 active:bg-red-50 border border-red-100 rounded-full text-xs text-gray-500 whitespace-nowrap"
        >
          #{{ w.word }}
        </button>
      </div>
    </div>
    <div v-if="displayCategoryTitle" class="max-w-7xl">
      <title-category :name="explorerState.categoryName" />
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { Keyboard } from '@capacitor/keyboard'
import { StatusBar, Style } from '@capacitor/status-bar'
import TitleCategory from '~/components/title-category.vue'
import BtnCancel from '~/components/buttons/btn-cancel.vue'
import Bridge from '~/plugins/capacitor'

export default {
  components: { BtnCancel, TitleCategory },
  data () {
    return {
      displaySearchBar: false,
      displayWordList: false,
      displayCategoryTitle: false,
      searchString: '',
      wordList: Object
    }
  },
  computed: {
    ...mapState(['explorerState'])
  },
  methods: {
    async setStatusBar () {
      await StatusBar.setOverlaysWebView({ overlay: true })
      await StatusBar.setStyle({ style: Style.Light })
    },
    setSearchString () {
      this.$nuxt.$emit('getSearchString', this.searchString) // Get value in search page
    },
    clearInput () {
      this.$refs.inputSearchBar.focus()
      Keyboard.show()
      this.searchString = ''
    },
    async fetchWordList () {
      this.wordList = await Bridge.getWordList()
    }
  },
  created () {
    this.setStatusBar()
    this.$nuxt.$on('search-bar', (display) => {
      if (display && this.wordList === Object) {
        // Get word list
        this.fetchWordList()
      }
      this.displaySearchBar = display
      this.displayWordList = display
    })
    this.$nuxt.$on('category-title', (display) => {
      this.displayCategoryTitle = display
    })
  }
}
</script>
