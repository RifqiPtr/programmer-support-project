import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-onboard',
  standalone: true,
  providers: [UiService],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent {
  notchText: string[] = Array.from('Project-Angular-1');
  infoProject: string = 'Hi, this is the project based on Angular.';
  detailProject: string = 'There is two different option to Access the website, click the Online Button to Access the Website with Internet, or Offline Button to Access the Website without Internet.'

  constructor(
    private dataService: DataService,
    private router: Router,
    private uiService: UiService){}

  async download(){
    try {
      this.uiService.loadingOfflineMode();
      await this.dataService.loadDataArticle();
      await this.dataService.loadDetailArticle();
      this.uiService.closeAllDialog();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error:', error); 
    }
  }

  home() {
    this.router.navigate(['/home']);
  }
}
