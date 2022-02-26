<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="swiper w-full h-64">
    <!-- Articles À la Une -->
    <swiper-slide v-for="article in primaryArticles" :key="article.id">
      <div @click="goToArticlePage(article.url)">
        <div class="relative h-64 overflow-hidden">
          <img
            :src="article.img"
            class="absolute h-full w-full object-cover blur-sm"
          />
          <img :src="article.img" class="absolute h-full w-full object-contain" />
          <div
            class="absolute inset-x-0 bottom-0 p-4 font-bold text-md text-white text-shadow-swiper-slide bg-black/50"
            style="text-shadow: -1px 0 #b01329, 0 1px #b01329, 1px 0 #b01329, 0 -1px #b01329;"
          >
            {{ article.title }}
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" />
  </swiper>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    primaryArticles: Array
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 3
          },
          640: {
            slidesPerView: 2
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['setArticleState']),
    goToArticlePage (url) {
      this.setArticleState(url)
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped>
.swiper-pagination {
  height: 14px !important;
}
.swiper-pagination >>> .swiper-pagination-bullet {
  opacity: 1 !important;
  width: 6px !important;
  height: 6px !important;
  background-color: #d1d5db !important;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #b91c1c !important;
}
</style>
