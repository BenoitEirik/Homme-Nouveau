<template>
  <div class="p-4 w-full flex justify-center items-center text-xl font-bold text-red-700">
    <div @click="goToNextPage(pageNumber - 1)" class="px-4">
      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" :fill="(pageNumber === 1) ? '#9ca3af':'#b91c1c'"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/></svg>
    </div>
    <div>
      {{ 'Page ' + pageNumber + ' sur ' + totalNumberOfPages }}
    </div>
    <div @click="goToNextPage(pageNumber + 1)" class="px-4">
      <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" :fill="(pageNumber === totalNumberOfPages) ? '#9ca3af':'#b91c1c'"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/></svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: String, // String like: 'Page 1 de 5'
    pageNumber: Number
  },
  data () {
    return {
      originalURL: String,
      totalNumberOfPages: Number
    }
  },
  methods: {
    goToNextPage (newPageNumber) {
      // Check if newPageNumber is valid
      if (newPageNumber < 1 || newPageNumber > this.totalNumberOfPages) {
        return
      }
      // Make the new URL and send it to parent
      const indexLastSlash = this.originalURL.lastIndexOf('/')
      const newURL = this.originalURL.slice(0, indexLastSlash) + '/' + String(newPageNumber) + this.originalURL.slice(indexLastSlash)
      this.$parent.getNextArticles(newURL, newPageNumber)
    }
  },
  beforeMount () {
    const searchParams = new URLSearchParams(window.location.search)
    this.originalURL = decodeURI(searchParams.get('originalURL'))
    this.totalNumberOfPages = Number(this.pagination.slice(this.pagination.lastIndexOf('de ') + 3))
  }
}
</script>
