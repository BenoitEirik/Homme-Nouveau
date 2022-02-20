<template>
  <div class="w-full h-full flex p-4 text-xl font-bold text-red-700">
    <p>◈&nbsp;</p>
    <p class="underline">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>
