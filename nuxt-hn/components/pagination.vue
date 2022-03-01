<template>
  <div class="p-4 w-full flex justify-between items-center text-md font-bold text-red-700">
    <div @click="goToNextPage(pageNumber - 1)" class="px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        viewBox="0 0 24 24"
        width="36px"
        :fill="(pageNumber === 1) ? '#d1d5db':'#b91c1c'"><path d="M0 0h24v24H0V0z"
        fill="none"
        class="rounded-full border-red-50"
      />
        <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/>
      </svg>
    </div>
    <div>
      {{ 'Page ' + pageNumber + ' sur ' + totalNumberOfPages }}
    </div>
    <div @click="goToNextPage(pageNumber + 1)" class="px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="36px"
        viewBox="0 0 24 24"
        width="36px"
        :fill="(pageNumber === totalNumberOfPages) ? '#d1d5db':'#b91c1c'"
        class="rounded-full border-red-50"
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    pagination: String, // String like: 'Page 1 de 5'
    pageNumber: Number
  },
  data () {
    return {
      totalNumberOfPages: Number
    }
  },
  methods: {
    ...mapActions(['setExplorerState']),
    goToNextPage (newPageNumber) {
      // Check if newPageNumber is valid
      if (newPageNumber < 1 || newPageNumber > this.totalNumberOfPages) {
        return
      }
      this.setExplorerState({ pageNumber: newPageNumber })
    }
  },
  beforeMount () {
    this.totalNumberOfPages = Number(this.pagination.slice(this.pagination.lastIndexOf('de ') + 3))
  }
}
</script>
