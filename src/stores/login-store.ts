import { defineStore } from 'pinia';
import {
  Http,
  HttpResponse,
} from '../../src-capacitor/node_modules/@capacitor-community/http';
import { baseUrl } from 'src/assets/js/utils';

export const useLoginStore = defineStore('login', {
  state: () => ({
    //
  }),
  actions: {
    async connection() {
      const response: HttpResponse = await Http.post({
        url: `${baseUrl}/wp-admin/admin-ajax.php`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: {
          'xoo-el-username': 'olafsergent@gmail.com',
          'xoo-el-password': process.env.HN_TEST_PWD,
          'xoo-el-rememberme': 'forever',
          _xoo_el_form: 'login',
          xoo_el_redirect: '/',
          action: 'xoo_el_form_action',
          display: 'popup',
        },
        webFetchExtra: {
          credentials: 'include',
        },
      });

      if (
        !response.headers['Set-Cookie'] &&
        !response.headers['Set-Cookie'].includes('wordpress_logged_in')
      )
        throw 'Échec de la connexion';
    },
  },
});
