import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SportsPage } from './sports';
import { SportsFilterPageModule } from './sports-filter/sports-filter.module';
import { SportsService } from '../../services/rss-services/sports-service';

@NgModule({
  declarations: [SportsPage],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SportsFilterPageModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: SportsPage
      }
    ])
  ],
  providers: [
    SportsService,
  ]
})
export class SportsPageModule { }
