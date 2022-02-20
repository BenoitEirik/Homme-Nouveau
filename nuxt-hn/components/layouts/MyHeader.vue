<template>
  <nav class="border-b border-gray-100">
    <div class="relative max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <btn-back class="absolute left-0" v-show="display" />
      <img src="@/assets/logo/logo-large.png" class="h-10" />
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      display: false
    }
  },
  created () {
    this.$nuxt.$on('back-icon', (display) => {
      if (display) {
        this.display = true
      } else {
        this.display = false
      }
    })
  }
}
</script>
