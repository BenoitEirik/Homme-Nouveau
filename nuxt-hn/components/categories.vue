<template>
  <div class="p-3 w-full flex flex-wrap">
    <btn-category
      v-for="category in categories"
      :key="category.name"
      :name="category.name"
      :url="category.url"
    />
  </div>
</template>

<script>
export default {
  props: {
    categories: []
  }
}
</script>
