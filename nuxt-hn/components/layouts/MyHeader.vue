<template>
  <nav style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
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
