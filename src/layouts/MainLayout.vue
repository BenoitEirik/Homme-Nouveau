<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header">
      <q-toolbar class="justify-between toolbar-bottom" style="height: 60px">
        <q-btn
          color="primary"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-img
          src="~assets/images/logo/large.png"
          alt="L'Homme Nouveau"
          width="200px"
        />

        <q-btn
          color="primary"
          flat
          dense
          round
          icon="search"
          aria-label="Recherche"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <div class="q-pa-lg logo">
        <q-img src="~assets/images/logo/small.svg" fit="contain" class="fit" />
      </div>
      <h6 class="q-ma-none q-pb-md bg-primary text-secondary text-center">
        L'Homme Nouveau
      </h6>

      <q-list>
        <q-item clickable target="_blank" href="https://hommenouveau.fr">
          <q-item-section avatar>
            <q-icon name="web" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Site internet</q-item-label>
            <q-item-label caption>https://hommenouveau.fr</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable @click="$router.push('/login')">
          <q-item-section avatar>
            <q-icon name="account_circle" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Se connecter</q-item-label>
            <q-item-label caption>
              Pour accéder à tous les articles
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="
            async () => {
              await app.exitApp();
            }
          "
        >
          <q-item-section avatar>
            <q-icon name="logout" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quitter</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  StatusBar,
  Style,
} from '../../src-capacitor/node_modules/@capacitor/status-bar';
import { App } from '../../src-capacitor/node_modules/@capacitor/app';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    onMounted(async () => {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
    });

    return {
      app: App,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped lang="scss">
.q-header {
  background-color: #ffffff;
}

.toolbar-bottom {
  border-bottom: 1px solid $primary;
}

.logo {
  height: 10rem;
  background-color: $primary;
}
</style>
