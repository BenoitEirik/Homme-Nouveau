<template>
  <nuxt-link :to="'/article?url=' + encodeURI(url)" class="mx-2 my-1 max-w-md rounded-lg shadow-lg overflow-hidden bg-white">
    <div class="relative h-56 overflow-hidden">
      <img :src="img" class="absolute h-full w-full object-cover blur-sm">
      <img :src="img" class="absolute h-full w-full object-contain">
      <div class="absolute inset-x-0 bottom-0 p-2 font-bold text-md text-white text-shadow bg-black/50">{{ title }}</div>
    </div>
    <div class="pt-2 px-2 pb-1 text-sm text-gray-400">{{ detail }}</div>
    <div class="pt-1 px-2 pb-2 font-normal">{{ description }}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: Number,
    url: String,
    img: String,
    title: String,
    detail: String,
    description: String
  }
}
</script>

<style scoped>
.text-shadow {
  text-shadow: -1px 0 #B01329,0 1px #B01329,1px 0 #B01329,0 -1px #B01329;
}
</style>
