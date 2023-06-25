import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { ArticleDetail, ArticleList } from '../model/articlelist.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  articleList$: ArticleList[] = [];
  detailArticle$: ArticleDetail[] = [];

  constructor(
    private articleService: ArticleService,
    private localStorageService: LocalstorageService
    ) {}

  async loadDataArticle(): Promise<void> {
    try {
      const result = await this.articleService.fetchAllArticle().toPromise();
      
      if (Array.isArray(result)) {
        this.articleList$ = result
        .map((articleList: ArticleList) => ({
          by: articleList.by,
          descendants: articleList.descendants,
          id: articleList.id,
          kids: articleList.kids,
          score: articleList.score,
          text: articleList.text,
          time: articleList.time,
          title: articleList.title,
          type: articleList.type,
          timeConverter: this.articleService.formatTime(articleList.time)
        }));
        this.saveArticleList();
      }
        
    } catch (error) {
      console.error('Error:', error); 
    }
  }
    

  async loadDetailArticle(): Promise<void> {
    try {
      const result = await this.articleService.fetchAllKidsArticle().toPromise();
      
      if (Array.isArray(result)) {
        this.detailArticle$ = result
        .map((detailArticle: ArticleDetail) => ({
          by: detailArticle.by,
          id: detailArticle.id,
          kids: detailArticle.kids,
          parent: detailArticle.parent,
          text: detailArticle.text,
          time: detailArticle.time,
          type: detailArticle.type,
          timeConverter: this.articleService.formatTime(detailArticle.time)
        }));
        this.saveArticleDetail()
      } 

    } catch (error) {
      console.error('Error:', error); 
    }
  }

  async saveArticleDetail(){
    return this.localStorageService.saveData('ArticleDetail', this.detailArticle$);
  }

  async saveArticleList(){
    return this.localStorageService.saveData('ArticleList', this.articleList$);
  }

}
