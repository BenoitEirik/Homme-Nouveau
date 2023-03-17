import { defineStore } from 'pinia';
import { Article } from 'src/assets/js/articles';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http/dist/esm';
import { baseUrl } from 'src/assets/js/utils';

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    keywords: '',
    page: {
      current: 0,
      max: 0
    },
    articles: [] as Article[],
  }),
  actions: {
    async getListArticles() {
      const response = await Http.get({
        url: `${baseUrl}/?s=${this.keywords}`,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        },
      });

      if (response.status !== 200) {
        throw 'Échec de la récupération des articles';
      }

      const body = new DOMParser().parseFromString(
        response.data,
        'text/html'
      ).body;

      const articleNodes = body
        .querySelector('.paginated_page')
        ?.querySelectorAll('article');

      if (articleNodes) {
        articleNodes.forEach((article) => {
          const id = article.id.replace('post-', '');
          const title = article.querySelector('div.post-content h2.post-title a')?.textContent || '';
          const description = article.querySelector('div.post-content div.excerpt p')?.textContent || '';
          const cover = article.querySelector('div.header a picture source')?.getAttribute('srcset') || '';
          const url = article.querySelector('div.post-content h2.post-title a ')?.getAttribute('href') || '';
          const meta = article.querySelector('.post-meta span')?.textContent || '';
          const tags = [] as {
            label: string;
            url: string;
          }[]

          this.articles.push({
            id,
            title,
            description,
            cover,
            url,
            meta,
            tags,
          });
        });
      }
    },
  },
});
