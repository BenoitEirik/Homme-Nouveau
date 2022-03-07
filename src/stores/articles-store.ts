import { defineStore } from 'pinia';
import { Article, ArticleContent } from 'src/assets/js/articles';
import { Http } from '../../src-capacitor/node_modules/@capacitor-community/http/dist/esm';
import { baseUrl } from 'src/assets/js/utils';

export const useArticlesStore = defineStore('articlesStore', {
  state: () => ({
    articles: [] as Article[],
  }),
  actions: {
    async getListArticles() {
      const response = await Http.get({
        url: `${baseUrl}/category/a-la-une/`,
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
        .querySelector('.el-dbe-blog-extra.grid_extended')
        ?.querySelectorAll('article');

      if (articleNodes) {
        articleNodes.forEach((article) => {
          const id = article.id.replace('post-', '');
          const title =
            article.querySelector('h3.entry-title a')?.textContent || '';
          const description =
            article.querySelector('div.post-data p')?.textContent || '';
          const cover =
            article
              .querySelector('div.post-media img')
              ?.getAttribute('srcset') || '';
          const url =
            article.querySelector('h3.entry-title a')?.getAttribute('href') ||
            '';
          const meta =
            article.querySelector('.post-meta span')?.textContent || '';
          const tags = Array.from(
            article.querySelectorAll('.post-categories a')
          )
            .map((category: Element) => {
              const label = (category as HTMLAnchorElement).textContent || '';
              const url = (category as HTMLAnchorElement).href || '';
              if (label === 'A la une') return { label: '', url: '' };
              return { label, url };
            })
            .filter((category) => category.label !== '');

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
    async getArticleContent(id: number) {
      const index = this.articles.findIndex(
        (article: Article) => article.id === String(id)
      );

      // Check if content already exist
      if (this.articles[index].content !== undefined)
        return this.articles[index].content;
      const response = await Http.get({
        url: `${baseUrl}/?p=${id}`,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        },
      });

      if (response.status !== 200) {
        throw "Échec de la récupération des données de l'article";
      }

      const body = new DOMParser().parseFromString(
        response.data,
        'text/html'
      ).body;

      // Add attribute to youtube iframes & img
      const youtubeIframes = body.querySelectorAll('iframe');
      youtubeIframes.forEach((iframe) => {
        const iframeSrc = iframe.getAttribute('src');
        if (iframeSrc && iframeSrc.includes('youtube.com')) {
          iframe.setAttribute(
            'style',
            'width: 100%; max-width: 100%; height: auto;'
          );
        }
      });
      const imgs = body.querySelectorAll('img');
      imgs.forEach((img) => {
        img.setAttribute('style', 'max-width: 100%; height: auto;');
      });

      const htmlContent = body.querySelector(
        '.et_pb_module.et_pb_post_content.et_pb_post_content_0_tb_body'
      )?.outerHTML;

      if (this.articles[index].content === undefined) {
        this.articles[index].content = <ArticleContent>{
          html: htmlContent,
          author: '',
        };
      }

      return this.articles[index].content;
    },
  },
});
