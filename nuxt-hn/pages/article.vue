<template>
  <main style="flex: 2" class="overflow-y-auto">
    <div class="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8 min-h-full flex justify-start items-center">
      <div v-if="loaded" class="w-full h-full rounded-2xl sm:shadow-md border-8 border-white">
        <div v-text="article.title" class="text-2xl font-bold text-red-700 border-8 border-white" />
        <div id="dynamic-content" v-html="article.content" class="leading-relaxed text-base espace-btn-el border-8 overflow-hidden border-white" />
      </div>
      <svg-loader v-else color="#b91c1c" />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Bridge from '~/plugins/capacitor'

export default {
  data () {
    return {
      loaded: false,
      article: {}
    }
  },
  computed: {
    ...mapState(['articleState'])
  },
  methods: {
    async fetchArticle () {
      this.article = await Bridge.getArticleData({ url: this.articleState.articleURL })
    },
    formatVirtualHtml () {
      this.$nextTick(function () {
        // Transform relative path to absolute path for imgs
        const myDomain = 'www.hommenouveau.fr'
        const imgs = document.getElementById('dynamic-content').getElementsByTagName('img')
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
  },
  created () {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.getArticleState,
      (newValue, oldValue) => {
        if (newValue.articleURL !== oldValue.articleURL) {
          this.loaded = false
          this.fetchArticle().then(() => {
            this.loaded = true
            this.formatVirtualHtml()
          })
        }
      }
    )
  },
  mounted () {
    // Get data by watching for first time
    this.loaded = false
    this.fetchArticle().then(() => {
      this.loaded = true
      this.formatVirtualHtml()
    })
  },
  activated () {
    this.$nuxt.$emit('back-icon', true)
  }
}
</script>

<style scoped>
.espace-btn-el >>> * {
  padding-top: 4px;
  padding-bottom: 4px;
}
.espace-btn-el >>> .publication {
  font-size: 14px;
  color: rgb(96, 165, 250);
}
.espace-btn-el >>> img,  .espace-btn-el >>> iframe {
  margin-left: auto;
  margin-right: auto;
}
.espace-btn-el >>> iframe {
  max-width: 100%;
}
</style>
