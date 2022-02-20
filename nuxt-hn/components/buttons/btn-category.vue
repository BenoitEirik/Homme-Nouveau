<template>
  <nuxt-link :to="'/explorer?url=' + encodeURI(getPageURL())" class="flex-auto m-1 p-2 rounded-md text-center text-white font-bold bg-red-700">
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    name: String,
    url: String
  },
  methods: {
    getPageURL () {
      const indexLastSlash = this.url.lastIndexOf('/')
      return this.url.slice(0, indexLastSlash) + '/1' + this.url.slice(indexLastSlash)
    }
  }
}
</script>
