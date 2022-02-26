<template>
  <button @click="goToExplorerPage()" class="flex-auto m-1 p-2 rounded-full text-center text-sm text-red-700 font-bold border border-red-700">
    {{ name }}
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    name: String,
    url: String
  },
  methods: {
    ...mapActions(['setExplorerState']),
    goToExplorerPage () {
      this.setExplorerState({ pageNumber: 1, categoryURL: this.url, categoryName: this.name })
      this.$router.push('/explorer')
    }
  }
}
</script>
