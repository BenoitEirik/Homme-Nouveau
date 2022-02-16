<template>
  <nuxt-link :to="'/article?url=' + encodeURI(url)" class="m-8 max-w-md rounded-lg shadow-lg overflow-hidden bg-white">
    <div class="relative h-56">
      <img :src="img" class="h-full w-full object-cover rounded-b-lg">
      <div class="absolute inset-x-2 bottom-2 p-2 text-xl text-white font-bold text-shadow bg-black/50 rounded-lg">{{ title }}</div>
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
