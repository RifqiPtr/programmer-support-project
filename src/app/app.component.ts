import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticlelistComponent } from './modules/articlelist/articlelist.component';
import { OnboardComponent } from './modules/onboard/onboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ArticlelistComponent,
    OnboardComponent
  ],
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'rifqi-project-angular';
}
