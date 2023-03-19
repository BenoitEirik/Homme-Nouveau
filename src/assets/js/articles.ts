export interface Article {
  id: string;
  title: string;
  description: string;
  cover: string;
  url: string;
  meta: string;
  tags: {
    label: string;
    url: string;
  }[];
  content?: ArticleContent | undefined;
  subscriberOnly?: boolean | undefined;
}

export interface ArticleContent {
  html: string;
  author: string;
}
