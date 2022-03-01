<template>
  <button @click="goToArticlePage()" class="mx-4 my-2 max-w-md rounded-lg my-article-card overflow-hidden bg-white">
    <div class="relative h-56 overflow-hidden">
      <img :src="img" class="absolute h-full w-full object-cover blur-sm scale-105">
      <img :src="img" class="absolute h-full w-full object-contain">
      <div class="absolute inset-x-0 bottom-0 p-4 font-bold text-md text-white text-shadow bg-black/50">{{ title }}</div>
    </div>
    <div class="pt-2 px-4 text-sm text-gray-400 italic">{{ detail }}</div>
    <div class="pt-2 px-4 pb-4 text-justify">{{ description }}</div>
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
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.text-shadow {
  text-shadow: -1px 0 #B01329,0 1px #B01329,1px 0 #B01329,0 -1px #B01329;
}
</style>
