import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailarticleComponent } from '../detailarticle/detailarticle.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from 'src/app/services/data.service';
import {MatButtonModule} from '@angular/material/button';
import { ArticleList } from 'src/app/model/articlelist.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from 'src/app/services/article.service';
import { catchError } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { LoadingpageComponent } from '../loadingpage/loadingpage.component';

@Component({
  selector: 'app-articlelist',
  standalone: true,
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
    private matDialog: MatDialog
    ){}

  async ngOnInit(){
    const dataArticleList = this.articleService.getDataArticleList();
    
    if (navigator.onLine){
      if(!dataArticleList){
        
        this.matDialog.open(LoadingpageComponent, {
          minWidth:'400px',
          height:'300px',
          enterAnimationDuration:'150ms',
          exitAnimationDuration:'150ms',
          disableClose: true,
          data: 'Please wait, we try to get all article for you.'
        });

        this.articleService.fetchAllArticle().pipe(
          catchError(() => {
            this.matDialog.open(AlertComponent, {
              data: 'Something went wrong when we try to get the Article.',
              disableClose: true
            });
            return [];
          })
        ).subscribe((result: ArticleList[]) => {

          result.forEach((articleList: ArticleList) => {
            articleList.timeConverter = this.articleService.formatTime(articleList.time);
          });

          this.articleList$ = this.articleList$.concat(result),
          this.matDialog.closeAll();

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
    this.matDialog.open(DetailarticleComponent,{
      width:'60%',
      height:'80%',
      enterAnimationDuration:'150ms',
      exitAnimationDuration:'150ms',
      disableClose: true,
      data: selectedArticle
    })
  }
}



