import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedArticlesPage } from './saved-articles.page';

describe('SavedArticlesPage', () => {
  let component: SavedArticlesPage;
  let fixture: ComponentFixture<SavedArticlesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
