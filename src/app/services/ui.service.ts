import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingpageComponent } from '../modules/loadingpage/loadingpage.component';
import { ArticleList } from '../model/articlelist.model';
import { DetailarticleComponent } from '../modules/detailarticle/detailarticle.component';
import { AlertComponent } from '../modules/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    public matDialog: MatDialog
  ) { }

  loadingOfflineMode() {
    this.matDialog.open(LoadingpageComponent, {
      minWidth:'400px',
      height:'300px',
      enterAnimationDuration:'150ms',
      exitAnimationDuration:'150ms',
      disableClose: true,
      data: 'Do not leave or refresh this page, we try to download all article for offline mode.'
    });
  }

  loadingOnlineMode() {
    this.matDialog.open(LoadingpageComponent, {
      minWidth:'400px',
      height:'300px',
      enterAnimationDuration:'150ms',
      exitAnimationDuration:'150ms',
      disableClose: true,
      data: 'Trying to get the list article for you. Do not refresh or leave this page.'
    });
  }

  openDetailArticle(selectedArticle: ArticleList) {
    this.matDialog.open(DetailarticleComponent,{
      width:'60%',
      height:'80%',
      enterAnimationDuration:'150ms',
      exitAnimationDuration:'150ms',
      disableClose: true,
      data: selectedArticle
    })
  }

  errorFetchAllArticle() {
    this.matDialog.open(AlertComponent, {
      data: 'Something went wrong when we try to get the Article.',
      disableClose: true
    });
  }

  errorFetchArticleComment(){
    this.matDialog.open(AlertComponent, {
      data: 'Something went wrong when we try to get the Article Comment.',
      disableClose: true
    })
  }

  closeAllDialog() {
    this.matDialog.closeAll();
  }
}
