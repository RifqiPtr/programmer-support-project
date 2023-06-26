import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailarticleComponent } from '../detailarticle/detailarticle.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from 'src/app/services/data.service';
import {MatButtonModule} from '@angular/material/button';
import { ArticleList } from 'src/app/model/articlelist.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from 'src/app/services/article.service';
import { catchError } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-articlelist',
  standalone: true,
  providers: [UiService],
  imports: [
    CommonModule,
    DetailarticleComponent,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.scss']
})

export class ArticlelistComponent implements OnInit{
  articleList$: ArticleList[] = [];
  midIndex = 4;
  lastIndex = 8;
  
  constructor(
    public dataService: DataService,
    private articleService: ArticleService,
    private uiService: UiService
    ){}

  async ngOnInit(){
    const dataArticleList = this.articleService.getDataArticleList();
    
    if (navigator.onLine){
      if(!dataArticleList){
        
        this.uiService.loadingOnlineMode();

        this.articleService.fetchAllArticle().pipe(
          catchError(() => {
            this.uiService.errorFetchAllArticle();
            return [];
          })
        ).subscribe((result: ArticleList[]) => {

          result.forEach((articleList: ArticleList) => {
            articleList.timeConverter = this.articleService.formatTime(articleList.time);
          });

          this.articleList$ = this.articleList$.concat(result),
          this.uiService.closeAllDialog();

        });

      } else {
        this.articleList$ = this.articleService.getDataArticleList();
      }
    } else  {
      this.articleList$ = this.articleService.getDataArticleList();
    }
  }

  openDetail(index: number) {
    const selectedArticle = this.articleList$[index];
    this.uiService.openDetailArticle(selectedArticle);
  }
}



