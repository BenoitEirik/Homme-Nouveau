<template>
  <main style="flex: 2" class="overflow-y-auto">
    <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full flex justify-center items-center">
      <div v-if="loaded" class="p-4 w-full h-full rounded-2xl shadow-lg">
        <div v-text="article.title" class="text-xl font-bold text-red-700 underline" />
        <div id="dynamic-content" v-html="article.content" class="leading-relaxed text-base espace-btn-el" />
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
    this.article = await Bridge.getArticleData({ url: decodeURI(searchParams.get('url')) })
    this.loaded = true
    this.formatVirtualHtml()
  },
  mounted () {
    this.$nuxt.$emit('back-icon', true)
  },
  methods: {
    async echo (value) {
      const { data } = await Bridge.echo({ value })
      console.log('ConsoleLog: ', String(data.value))
    },
    formatVirtualHtml () {
      this.$nextTick(function () {
        // Transform relative path to absolute path for imgs
        const myDomain = 'www.hommenouveau.fr'
        const imgs = document.getElementById('dynamic-content').getElementsByTagName('img')
        this.echo('imgs = ' + imgs)
        for (let i = 0; i < imgs.length; i++) {
          const myURL = imgs[i].src
          let finalURL

          if (!myURL.includes(myDomain)) {
            finalURL = new URL(myURL)
            finalURL.hostname = myDomain
            finalURL.port = ''
            finalURL.protocol = 'https:'
            imgs[i].src = finalURL.href
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.espace-btn-el >>> * {
  padding-top: 4px;
  padding-bottom: 4px;
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
