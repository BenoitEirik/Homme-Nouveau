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
        class="pl-4 pr-12 w-full p-2 rounded-full"
        style="box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
      />
      <btn-cancel v-if="searchString !== ''" class="absolute top-5 right-6" />
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

export default {
  components: { BtnCancel, TitleCategory },
  data () {
    return {
      displaySearchBar: false,
      displayCategoryTitle: false,
      searchString: ''
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
      this.setSearchString()
    }
  },
  created () {
    this.setStatusBar()
    this.$nuxt.$on('search-bar', (display) => {
      this.displaySearchBar = display
    })
    this.$nuxt.$on('category-title', (display) => {
      this.displayCategoryTitle = display
    })
  }
}
</script>
