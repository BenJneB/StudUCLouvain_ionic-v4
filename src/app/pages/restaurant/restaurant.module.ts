import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RestaurantPage } from './restaurant';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule( {
  declarations: [RestaurantPage],
  imports: [
  	IonicModule,
  	TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RestaurantPage
      }
    ])
  ]
})
export class RestaurantPageModule { }