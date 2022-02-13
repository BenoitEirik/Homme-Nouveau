<template>
  <nuxt-link :to="{ path: '/article/' + String(id), query: { url: encodeURI(url) } }" class="m-8 max-w-lg rounded-lg shadow-lg overflow-hidden">
    <div class="relative h-56">
      <img :src="img" class="h-full w-full object-cover">
      <div class="absolute inset-x-4 bottom-4 text-xl text-white font-bold text-shadow">{{ title }}</div>
    </div>
    <div class="pt-4 px-4 pb-2 text-gray-400">Religion, rédigé par un moine de Triors - Publié le: 12/02/2022 </div>
    <div class="pt-2 px-4 pb-4">{{ description }}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: Number,
    url: String,
    img: String,
    title: String,
    description: String
  }
}
</script>

<style scoped>
.text-shadow {
    text-shadow: -1px 0 #B01329,0 1px #B01329,1px 0 #B01329,0 -1px #B01329;
}
</style>
