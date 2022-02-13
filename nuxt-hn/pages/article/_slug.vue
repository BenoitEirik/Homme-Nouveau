<template>
  <main style="flex: 2" class="overflow-y-auto">
    <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full flex justify-center items-center">
      <div v-if="loaded" class="p-8 w-full h-full rounded-2xl shadow-lg">
        <div v-text="article.title" class="mb-8 text-3xl font-bold text-red-700" />
        <div v-html="article.content" class="leading-relaxed text-lg espace-btn-el" />
      </div>
      <img v-else src="@/assets/loader/rolling.gif">
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      loaded: false,
      article: {}
    }
  },
  methods: {
    async fetchArticle () {
      this.article = await this.$axios.$get('/api/article?url=' + this.$route.params.url)
      this.loaded = true
    }
  },
  mounted () {
    this.fetchArticle()
  }
}
</script>

<style scoped>
.espace-btn-el >>> * {
  margin: 10px;
}
</style>
