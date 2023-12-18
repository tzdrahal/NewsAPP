export interface NewsResponse {
  articles: Article[];
}

export interface Article {
[x: string]: any;
title: string;
description: string;
url: string;
urlToImage: string;
publishedAt: Date;
content: string;
isDescriptionExpanded?: boolean;
}