import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadingpageComponent } from '../loadingpage/loadingpage.component';

@Component({
  selector: 'app-onboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent {
  constructor(
    private dataService: DataService,
    private router: Router,
    private matDialog: MatDialog){}

  async download(){
    try {
      this.matDialog.open(LoadingpageComponent, {
        minWidth:'400px',
        height:'300px',
        enterAnimationDuration:'150ms',
        exitAnimationDuration:'150ms',
        disableClose: true,
        data: 'Please wait, we try to download all Article for offline mode.'
      });
      await this.dataService.loadDataArticle();
      await this.dataService.loadDetailArticle();
      this.matDialog.closeAll();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error:', error); 
    }
  }

  home() {
    this.router.navigate(['/home']);
  }
}
