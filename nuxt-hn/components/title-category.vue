<template>
  <div class="w-full h-full flex justify-center p-4 text-2xl font-bold text-red-700">
    <p>◈&nbsp;</p>
    <p>{{ name }}</p>
    <p>&nbsp;◈</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>
