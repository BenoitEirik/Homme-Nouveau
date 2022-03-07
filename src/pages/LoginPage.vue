<template>
<q-page class="fit column items-stretch">
  <q-banner class="text-white top-banner">
    <p class="text-h6">Abonnement</p>

    <p>
      Certains articles sont gratuits. Cependant, pour consulter l'ensemble des articles, il est nécessaire de
      s'abonner à l'Homme Nouveau. Pour soutenir le travail de l'Homme Nouveau, merci de vous abonner en souscrivant à
      l'une des formules proposées sur le site.
    </p>

    <template v-slot:action>
      <q-btn flat color="white" label="S'abonner" href="https://hommenouveau.fr/la-boutique/" />
    </template>
  </q-banner>

  <q-banner>
    <p class="text-h6 primary">Connexion</p>

    <p>Si vous êtes abonné, vous pouvez vous connecter.</p>

    <q-input outlined v-model="username" label="Identifiant ou adresse email" class="q-px-md q-py-sm" />

    <q-input outlined v-model="password" label="Mot de passe" class="q-px-md q-py-sm" />

    <template v-slot:action>
      <q-btn flat color="primary" label="Se connecter" :loading="loadingConnection" @click="connection()" />
    </template>
  </q-banner>

  <p class="primary text-center">
    {{ error }}
  </p>

  <div class="col q-pb-md column justify-end items-center">
    <q-btn flat no-caps color="primary" label="Utiliser l'application sans compte"
      style="text-decoration: underline; align-self: center;" @click="noConnection()" />
  </div>
</q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Storage } from '../../src-capacitor/node_modules/@capacitor/storage';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login-store'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const username = ref<string>('')
    const password = ref<string>('')
    const loadingConnection = ref<boolean>(false)
    const loginStore = useLoginStore()
    const error = ref<string>('')

    async function noConnection() {
      await Storage.set({
        key: 'connected',
        value: 'false',
      });
      router.replace('/')
    }

    async function connection() {
      loadingConnection.value = !loadingConnection.value
      await loginStore.connection().catch((value: string) => {
        error.value = value
      })
      loadingConnection.value = !loadingConnection.value
    }

    return {
      username,
      password,
      noConnection,
      connection,
      loadingConnection,
      error
    }
  }
})
</script>

<style lang="scss">
.top-banner {
  background-color: $primary;
}
</style>
