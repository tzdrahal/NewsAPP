import { Component } from '@angular/core';
import { NewsFeedsService } from '../news-feeds.service';
import { Article, NewsResponse } from '../news.model.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  articles: Article[] = [];
  selectedCategories: string[] = [];
  savedArticles: Article[] = [];

  constructor(private newsService: NewsFeedsService, private router: Router) {
    this.loadPreferredNews(); // Načtení novinek podle preferencí při spuštění
    this.loadSavedArticles();
  }

  // Tato metoda načte novinky podle uložených preferencí uživatele
  loadPreferredNews(){
    this.newsService.getUserPreferences().then(preferences => {
      if (preferences && preferences.length > 0) {
        // Načtení novinek pro každou kategorii a spojení výsledků
        preferences.forEach((category, index) => {
          this.newsService.getNews(`top-headlines?country=us&category=${category}`).subscribe((newsResponse: NewsResponse) => {
            if (index === 0) {
              this.articles = newsResponse.articles;
            } else {
              this.articles = this.articles.concat(newsResponse.articles);
            }
          });
        });
      } else {
        // Pokud nejsou žádné preference, načtou se výchozí novinky
        this.loadNews();
      }
    });
  }

  // Tato metoda načte výchozí novinky (např. top-headlines pro US)
  loadNews(){ 
    this.newsService.getNews("top-headlines?country=us").subscribe(newsResponse => {
      this.articles = newsResponse.articles;
      console.log(this.articles);
    });
  }

  // Tato metoda aktualizuje preferované kategorie uživatele
  updatePreferences() {
    this.newsService.setUserPreferences(this.selectedCategories).then(() => {
      this.loadPreferredNews(); // Po aktualizaci preferencí se znovu načtou novinky
    });
  }

  // Metoda pro vyvolání při změně výběru kategorií ve view
  onCategoryChange() {
    this.selectedCategories = [...new Set(this.selectedCategories)];
    this.updatePreferences();
  }

  saveArticle(article: Article) {
    this.newsService.saveArticle(article).then(() => {
      console.log('Article saved for offline reading.');
      // Můžete přidat aktualizaci UI nebo přidat článek do savedArticles
      this.savedArticles.push(article);
    });
  }

  // Načíst uložené články
  loadSavedArticles() {
    this.newsService.getSavedArticles().then((articles: Article[]) => {
      this.savedArticles = articles;
    });
  }

  // Odebrat článek ze záložek
  removeArticle(article: Article) {
    this.newsService.removeArticle(article).then(() => {
      console.log('Article removed from saved articles.');
      // Aktualizovat savedArticles po odebrání
      this.savedArticles = this.savedArticles.filter(a => a.title !== article.title);
    });
  }

  goToSavedArticles() {
    this.router.navigateByUrl('/saved-articles');
  }

  get selectedCategoriesDisplay(): string {
    return this.selectedCategories.length > 0 ? this.selectedCategories.map(category => this.formatCategory(category)).join(', ') : 'Choose Categories';
  }

  formatCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
