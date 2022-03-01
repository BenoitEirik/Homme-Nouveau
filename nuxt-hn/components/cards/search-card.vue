<template>
  <div @click="goToArticlePage()" class="px-3 py-1">
    <div class="p-3 w-full flex space-x-2 rounded-lg overflow-hidden" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
      <img :src="article.img" class="w-24 object-contain">
      <div>
        <div class="text-base line-clamp-2 text-red-700">{{ article.title }}</div>
        <div class="text-sm line-clamp-3">{{ article.description }}</div>
      </div>
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
