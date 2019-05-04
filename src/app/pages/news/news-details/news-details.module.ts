import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NewsDetailsPage } from './news-details';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewsDetailsPage],
  imports: [
    IonicModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: NewsDetailsPage
      }
    ])
  ]
})
export class NewsDetailsPageModule { }