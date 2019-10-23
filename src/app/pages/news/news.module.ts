import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NewsPage } from './news';
import { NewsService } from '../../services/rss-services/news-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { FacService } from '../../services/utils-services/fac-service';

@NgModule({
  declarations: [NewsPage],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: NewsPage
      }
    ])
  ],
    providers: [
        NewsService,
        ConnectivityService,
        FacService,
    ]
})
export class NewsPageModule { }
