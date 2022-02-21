<template>
  <nuxt-link :to="'/explorer?url=' + encodeURI(getPageURL()) + '&categoryName=' + name + '&pageNumber=' + String(pageNumber) + '&originalURL=' + encodeURI(url)" class="flex-auto m-1 p-2 rounded-md text-center text-white font-bold bg-red-700">
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    name: String,
    url: String
  },
  data () {
    return {
      pageNumber: 1
    }
  },
  methods: {
    getPageURL () {
      const indexLastSlash = this.url.lastIndexOf('/')
      return this.url.slice(0, indexLastSlash) + '/' + String(this.pageNumber) + this.url.slice(indexLastSlash)
    }
  }
}
</script>
