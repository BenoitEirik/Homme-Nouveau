import { boot } from 'quasar/wrappers'
import { Storage } from '../../src-capacitor/node_modules/@capacitor/storage';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, urlPath }) => {
  const isConnected: boolean = JSON.parse((await Storage.get({ key: 'connected' })).value || 'false')

  router.beforeEach(async (to, from, next) => {
    if (!isConnected && !to.path.includes('/login')) {
      next({ path: '/login' })
    } else
      next()
  })
})
