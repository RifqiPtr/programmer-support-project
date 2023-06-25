import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ArticleDetail, ArticleList } from '../model/articlelist.model';
import { Observable, forkJoin, isEmpty, of, switchMap } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private httpService : HttpService,
    private localStorageService: LocalstorageService
  ) {}
  
  fetchArticleId() {
    const url = 'askstories.json?print=pretty';
    return this.httpService.getHttp<number[]>(url);
  }

  fetchArticleData (articleIDs: number) {
    const url = `item/${articleIDs}.json?print=pretty`;
    return this.httpService.getHttp<ArticleList>(url)
  }
  
  fetchAllArticle(): Observable<ArticleList[]> {
    return this.fetchArticleId().pipe(
      switchMap((result: number[]) => {
        return result && result.length > 0 ? 
        forkJoin(
          result.map((articleID: number) => 
          this.fetchArticleData(articleID) as Observable<ArticleList>)
          ) : of([]);
      })
    );
  }

  fetchKidsId(id: number) {
    const url = `item/${id}.json?print=pretty`;
    return this.httpService.getHttp<ArticleDetail>(url);
  }

  fetchAllKidsArticle(): Observable<ArticleDetail[]> {
    const articleList = this.getDataArticleList();
    const kids = articleList.map((article: { kids: [] }) => article.kids)
    .filter(Boolean) as number[][];
  
    if (kids.length > 0) {
      const observables: Observable<ArticleDetail>[] = kids
        .flatMap(
          kidsid => kidsid.map(id => this.fetchKidsId(id))
        );
  
      return forkJoin(observables);
    }
  
    return of([]);
  }

  formatTime(epochTime: number): string {
    const currentTime = new Date().getTime() / 1000;
    const timeDiff = currentTime - epochTime;
  
    if (timeDiff < 60) {
      return "just now";
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDiff / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }


  getDataArticleList(){
    return this.localStorageService.getData('ArticleList');
   }

  getDataKidsArticle(){
    return this.localStorageService.getData('ArticleDetail')
  }
}
