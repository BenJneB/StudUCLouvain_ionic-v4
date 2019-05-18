import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ParamPage } from './param';

@NgModule({
  declarations: [ParamPage],
  imports: [
  	IonicModule,
  	TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParamPage
      }
    ])
  ]

})
export class ParamPageModule { }