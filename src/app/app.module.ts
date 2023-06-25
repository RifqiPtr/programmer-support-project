import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ArticlelistComponent } from './modules/articlelist/articlelist.component';
import { LoadingpageComponent } from './modules/loadingpage/loadingpage.component';
import { AlertComponent } from './modules/alert/alert.component';

@NgModule({
    declarations: [
    LoadingpageComponent,
    AlertComponent
  ],
    imports: [
        ArticlelistComponent,
        MatCardModule,
        MatGridListModule,
        FlexLayoutModule
    ],
    exports: [],
    providers: [],
})
export class FeatureModule {}