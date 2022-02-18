<template>
  <button class="flex-auto m-1 p-3 rounded-md text-white font-bold bg-red-700">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: String,
    url: String
  }
}
</script>
