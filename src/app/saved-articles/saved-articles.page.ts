// saved-articles.page.ts

import { Component, OnInit } from '@angular/core';
import { NewsFeedsService } from '../news-feeds.service';
import { Article } from '../news.model.ts.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-saved-articles',
  templateUrl: 'saved-articles.page.html',
  styleUrls: ['saved-articles.page.scss'],
})
export class SavedArticlesPage implements OnInit {
  savedArticles: Article[] = [];

  constructor(private newsService: NewsFeedsService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadSavedArticles();
  }

  loadSavedArticles() {
    this.newsService.getSavedArticles().then((articles: Article[]) => {
      this.savedArticles = articles;
    });
  }
 
  removeArticle(article: Article) {
    this.newsService.removeArticle(article).then(() => {
      console.log('Article removed from saved articles.');
      // Aktualizovat savedArticles po odebrání
      this.savedArticles = this.savedArticles.filter(a => a.title !== article.title);
    });
  }

  clearSavedArticles() {
    this.savedArticles = [];
 }

  goToHome() {
    this.navCtrl.navigateBack('/home');
 }

}
