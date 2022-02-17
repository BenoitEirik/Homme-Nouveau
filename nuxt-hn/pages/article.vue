<template>
  <main style="flex: 2" class="overflow-y-auto">
    <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full flex justify-center items-center">
      <div v-if="loaded" class="p-4 w-full h-full rounded-2xl shadow-lg">
        <div v-text="article.title" class="mb-8 text-3xl font-bold text-red-700 underline" />
        <div v-html="article.content" class="leading-relaxed text-lg espace-btn-el" />
      </div>
      <svg-loader v-else color="#b91c1c" />
    </div>
  </main>
</template>

<script>
import Bridge from '~/plugins/capacitor'

export default {
  data () {
    return {
      loaded: false,
      article: {}
    }
  },
  async fetch () {
    const searchParams = new URLSearchParams(window.location.search)
    this.article = await Bridge.getHomeData({ url: decodeURI(searchParams.get('url')) })
    this.loaded = true
  },
  mounted () {
    this.$nuxt.$emit('back-icon', true)
  }
}
</script>

<style scoped>
.espace-btn-el >>> * {
  padding-top: 10px;
  padding-bottom: 10px;
}
.espace-btn-el >>> .publication {
  font-style: italic;
}
.espace-btn-el >>> img,  .espace-btn-el >>> iframe{
  margin-left: auto;
  margin-right: auto;
}
.espace-btn-el >>> iframe {
  max-width: 100%;
}
</style>
