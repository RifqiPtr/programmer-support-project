import { Route } from '@angular/router';
import { OnboardComponent } from './modules/onboard/onboard.component';

export const APP_ROUTE: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'on-board'},
  {path: 'on-board', component: OnboardComponent},
  {path: 'home',
  loadComponent: () =>
   import('./modules/articlelist/articlelist.component').then(
    (c) => c.ArticlelistComponent
   )}
];
