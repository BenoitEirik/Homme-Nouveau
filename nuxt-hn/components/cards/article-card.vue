<template>
  <button @click="goToArticlePage()" class="mx-4 my-2 max-w-md rounded-lg my-article-card overflow-hidden bg-white">
    <div class="relative h-56 overflow-hidden">
      <img :src="img" class="absolute h-full w-full object-cover blur-sm">
      <img :src="img" class="absolute h-full w-full object-contain">
      <div class="absolute inset-x-0 bottom-0 p-4 font-bold text-md text-white text-shadow bg-black/50">{{ title }}</div>
    </div>
    <div class="pt-2 px-4 text-sm text-gray-400 italic">{{ detail }}</div>
    <div class="pt-2 px-4 pb-4">{{ description }}</div>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: Number,
    url: String,
    img: String,
    title: String,
    detail: String,
    description: String
  },
  methods: {
    ...mapActions(['setArticleState']),
    goToArticlePage () {
      this.setArticleState(this.url)
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped>
.my-article-card {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.text-shadow {
  text-shadow: -1px 0 #B01329,0 1px #B01329,1px 0 #B01329,0 -1px #B01329;
}
</style>
