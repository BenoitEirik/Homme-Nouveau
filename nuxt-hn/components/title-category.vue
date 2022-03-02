<template>
  <div class="p-4 w-full h-full flex justify-center text-xl font-bold text-red-700">
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
