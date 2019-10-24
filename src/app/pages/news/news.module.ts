import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NewsPage } from './news';
import { NewsService } from '../../services/rss-services/news-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { FacService } from '../../services/utils-services/fac-service';
import { NewsRoutingModule } from './news-routing.module';
import { NewsDetailsPage } from './news-details/news-details';

@NgModule({
    declarations: [NewsPage, NewsDetailsPage],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    NewsRoutingModule
  ],
    providers: [
        NewsService,
        ConnectivityService,
        FacService,
    ]
})
export class NewsPageModule { }
