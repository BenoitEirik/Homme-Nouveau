<template>
  <div class="p-1 w-full flex flex-wrap">
    <btn-category
      v-for="category in categories"
      :key="category.name"
      :name="category.name"
      :url="category.url"
    />
  </div>
</template>

<script>
import Bridge from '~/plugins/capacitor'

export default {
  data () {
    return {
      loaded: false,
      categories: []
    }
  },
  async fetch () {
    const data = await Bridge.getCategoriesData()
    this.categories = data.categories
    console.log('Categories =', this.categories)
    this.loaded = true
  }
}
</script>
