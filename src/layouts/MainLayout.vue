<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header">
      <q-toolbar
        :class="`justify-between ${
          $route.path !== '/search' ? 'toolbar-bottom' : ''
        }`"
        style="height: 60px"
      >
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
          @click="$router.push('/search')"
        />
      </q-toolbar>

      <q-toolbar
        v-if="$route.path === '/search'"
        class="justify-between"
        style="height: 60px"
      >
        <q-input
          rounded
          type="text"
          v-model="searchStore().keywords"
          label="Rechercher"
          class="fit"
        >
          <template v-if="searchStore().keywords" v-slot:append>
            <q-icon
              name="cancel"
              color="primary"
              @click.stop.prevent="searchStore().keywords = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <div class="q-pa-lg logo">
        <q-img src="~assets/images/logo/small.svg" fit="contain" class="fit" />
      </div>
      <blockquote
        class="q-ma-none q-pb-md bg-primary text-secondary text-center"
        cite="http://jesusmarie.free.fr/bible_crampon_ephesiens.html"
      >
        « Revêtez-vous de L’Homme Nouveau, créé, selon Dieu, dans la justice et
        la sainteté conformes à la vérité. » (Eph 4,24)
      </blockquote>

      <q-item clickable v-ripple @click="$router.push('/login')">
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

      <q-list>
        <q-item
          clickable
          v-ripple
          target="_blank"
          href="https://hommenouveau.fr"
        >
          <q-item-section avatar>
            <q-icon name="web" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Site internet</q-item-label>
            <q-item-label caption>https://hommenouveau.fr</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          target="_blank"
          href="https://hommenouveau.fr/faire-un-don/"
        >
          <q-item-section avatar>
            <q-icon name="euro" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Faire un don</q-item-label>
            <q-item-label caption>
              Pour permettre à l’Homme Nouveau de rayonner !
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  StatusBar,
  Style,
} from '../../src-capacitor/node_modules/@capacitor/status-bar';
import { App as app } from '../../src-capacitor/node_modules/@capacitor/app';
import { useSearchStore as searchStore } from '../stores/search-store';

const leftDrawerOpen = ref(false);

onMounted(async () => {
  await StatusBar.setStyle({ style: Style.Light });
  await StatusBar.setBackgroundColor({ color: '#ffffff' });
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
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
