import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { GuindaillePage } from './guindaille2-0';
import { Guindaille20RoutingModule } from './guindaille2-0-routing.module';

@NgModule({
  declarations: [GuindaillePage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    Guindaille20RoutingModule
  ]
})
export class GuindaillePageModule { }
