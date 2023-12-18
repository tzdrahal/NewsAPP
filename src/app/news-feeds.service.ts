import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, NewsResponse } from './news.model.ts.service';
import { Storage } from '@ionic/storage-angular';

const API_URL = environment.API_URL;
const API_KEY = environment.API_Key;

@Injectable({
  providedIn: 'root'
})
export class NewsFeedsService {
  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  
  getNews(url: string, category?: string): Observable<NewsResponse> {
    let categoryUrl = category ? `category=${category}&` : '';
    return this.http.get<NewsResponse>(`${API_URL}/${url}&${categoryUrl}apiKey=${API_KEY}`);
  }

  async setUserPreferences(categories: string[]): Promise<void> {
    await this._storage?.set('user_preferences', categories);
  }

  async getUserPreferences(): Promise<string[] | null> {
    return await this._storage?.get('user_preferences');
  }

  // Uložit článek offline
  async saveArticle(article: Article): Promise<void> {
    let articles = (await this._storage?.get('saved_articles')) || [];
    const exists = articles.find((a:Article )=> a.title === article.title);
    if (!exists) {
      articles.push(article);
      await this._storage?.set('saved_articles', articles);
    }
  }

  // Načíst uložené články
  async getSavedArticles(): Promise<Article[]> {
    return (await this._storage?.get('saved_articles')) || [];
  }

  // Odebrat článek ze záložek
  async removeArticle(article:Article): Promise<void> {
    let articles = (await this._storage?.get('saved_articles')) || [];
    articles = articles.filter((a: Article) => a.title !== article.title);
    await this._storage?.set('saved_articles', articles);
  }
}
