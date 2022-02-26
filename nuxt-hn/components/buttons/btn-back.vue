<template>
  <button @click="goBack()" class="px-4 py-2" v-show="display">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#b91c1c"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  </button>
</template>

<script>
import { App } from '@capacitor/app'

export default {
  data () {
    return {
      display: false
    }
  },
  methods: {
    goBack () {
      this.$router.back()
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

    // Hadware back button
    App.addListener('backButton', (data) => {
      if (this.$route.path === '/') {
        App.exitApp()
      } else {
        this.$router.back()
      }
    })
  }
}
</script>
