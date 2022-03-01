<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="swiper w-full bg-red-700">
    <!-- Articles À la Une -->
    <swiper-slide v-for="article in primaryArticles" :key="article.id">
      <div @click="goToArticlePage(article.url)">
        <div class="relative h-52 overflow-hidden">
          <img
            :src="article.img"
            class="absolute h-full w-full object-cover blur-sm scale-105"
          />
          <img :src="article.img" class="absolute h-full w-full object-contain" />
        </div>
        <div
          class="mt-4 mx-4 mb-5 h-14 font-bold text-lg text-white line-clamp-2 bg-red-700"
        >
          {{ article.title }}
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
  height: 16px !important;
}
.swiper-pagination >>> .swiper-pagination-bullet {
  opacity: 1 !important;
  width: 6px !important;
  height: 6px !important;
  background-color: #fff !important;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #cfaf1d !important;
}
</style>
