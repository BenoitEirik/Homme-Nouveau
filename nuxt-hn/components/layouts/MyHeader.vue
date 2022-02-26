<template>
  <nav style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
    <div class="relative max-w-7xl mx-auto mt-8 p-3 sm:px-6 lg:px-8 flex justify-center items-center">
      <btn-back class="absolute left-0" />
      <img src="@/assets/logo/logo-large.png" class="h-9" />
    </div>
  </nav>
</template>

<script>
import { StatusBar, Style } from '@capacitor/status-bar'

export default {
  methods: {
    async setStatusBar () {
      await StatusBar.setOverlaysWebView({ overlay: true })
      await StatusBar.setStyle({ style: Style.Light })
    }
  },
  created () {
    this.setStatusBar()
  }
}
</script>
