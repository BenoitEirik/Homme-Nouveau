<template>
  <button @click="goToExplorerPage()" class="flex-auto m-1 p-2 rounded-md text-center text-white font-bold bg-red-700">
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
