<template>
  <div class="w-full h-16 flex justify-center items-center">
    <div
      @click="goToNextPage(pageNumber + 1)"
      class="m-2 p-2 text-center text-sm text-gray-500 rounded-full border border-red-50 active:border-red-700"
    >
      Plus de résultats
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: String // String like: 'Page 1 de 5'
  },
  data () {
    return {
      totalNumberOfPages: Number,
      pageNumber: 1
    }
  },
  methods: {
    goToNextPage (newPageNumber) {
      // Check if newPageNumber is valid
      if (newPageNumber < 1 || newPageNumber > this.totalNumberOfPages) {
        return
      }
      this.$parent.fetchSearchArticlesMetadata(newPageNumber)
      this.pageNumber = newPageNumber
    }
  },
  beforeMount () {
    this.totalNumberOfPages = Number(this.pagination.slice(this.pagination.lastIndexOf('de ') + 3))
  }
}
</script>
