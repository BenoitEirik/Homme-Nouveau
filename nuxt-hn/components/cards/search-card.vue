<template>
  <div class="w-full flex border-b border-gray-300" @click="goToArticlePage()">
    <img :src="article.img" class="m-4 w-24 h-24 object-contain">
    <div class="flex-initial m-2">
      <div class="text-xl line-clamp-2 text-red-700">{{ article.title }}</div>
      <div class="line-clamp-3">{{ article.description }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    article: Object
  },
  methods: {
    ...mapActions(['setArticleState']),
    goToArticlePage () {
      this.setArticleState(this.article.url)
      this.$router.push('/article')
    }
  }
}
</script>
