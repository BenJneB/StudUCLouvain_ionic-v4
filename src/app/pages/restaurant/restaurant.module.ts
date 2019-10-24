import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RestaurantPage } from './restaurant';
import { RestaurantRoutingModule } from './restaurant-routing.module';

@NgModule({
  declarations: [RestaurantPage],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
      RestaurantRoutingModule
  ]
})
export class RestaurantPageModule { }
