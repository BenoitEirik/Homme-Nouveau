<template>
<q-layout view="lHh Lpr lFf">
  <q-header class="q-header">
    <q-toolbar class="justify-between toolbar-bottom" style="height: 60px;">
      <q-btn color="primary" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

      <q-img src="~assets/images/logo/large.png" alt="L'Homme Nouveau" width="200px" />

      <q-btn color="primary" flat dense round icon="search" aria-label="Recherche"
        @click="$router.push({ path: '/login' })" />
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header>
        Essential Links
      </q-item-label>
    </q-list>
  </q-drawer>

  <q-page-container>
    <router-view />
  </q-page-container>
</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { StatusBar, Style } from '../../src-capacitor/node_modules/@capacitor/status-bar'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Light })
      await StatusBar.setBackgroundColor({ color: '#ffffff' })
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>

<style scoped lang="scss">
.q-header {
  background-color: #ffffff;
}

.toolbar-bottom {
  border-bottom: 1px solid $primary;
}
</style>
