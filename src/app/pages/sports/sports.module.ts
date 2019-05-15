import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SportsPage } from './sports';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SportsFilterPageModule } from './sports-filter/sports-filter.module';

@NgModule( {
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
  ]
})
export class SportsPageModule { }