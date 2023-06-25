import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlelistComponent } from '../articlelist/articlelist.component';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ArticleDetail, ArticleList } from 'src/app/model/articlelist.model';
import { HttpService } from 'src/app/services/http.service';
import { ArticleService } from 'src/app/services/article.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-detailarticle',
  standalone: true,
  imports: [
    CommonModule,
    ArticlelistComponent,
    MatCardModule,
    FlexLayoutModule
  ],
  templateUrl: './detailarticle.component.html',
  styleUrls: ['./detailarticle.component.scss']
})

export class DetailarticleComponent {
  detailArticles$: ArticleDetail[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public articleDetail: ArticleList,
    private articleService: ArticleService,
    private matDialog: MatDialog
  ){}

  ngOnInit() {
    this.getKidsArticle();
  }
  
  getKidsArticle(){
    const articleKids = this.articleDetail.kids;
    const dataDetailArticle = this.articleService.getDataKidsArticle();

    if (!dataDetailArticle) {
      if (Array.isArray(articleKids)) {
        articleKids.forEach((id: number) => {
          this.articleService.fetchKidsId(id)
            .subscribe(
              (response: ArticleDetail) => {
                response.timeConverter = this.articleService.formatTime(response.time);
                this.detailArticles$.push(response);
              },
              () => {
                this.matDialog.open(AlertComponent, {
                  data: 'Something went wrong when we try to get the Article Comment.',
                  disableClose: true
                })
              }
            );
        });
      }

    } else if (Array.isArray(articleKids)) {
        articleKids.forEach((id: number) =>{
          const comment = dataDetailArticle.find(
            (detail: ArticleDetail) => detail.id === id);
          this.detailArticles$.push(comment);
        })
    }
  }

  close(){
    this.matDialog.closeAll();
  }
}
