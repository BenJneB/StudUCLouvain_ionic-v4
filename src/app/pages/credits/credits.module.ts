import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CreditsPage } from './credits';
import { AppVersion } from '@ionic-native/app-version/ngx';

@NgModule({
  declarations: [CreditsPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: CreditsPage
      }
    ])
  ],
    providers: [
        AppVersion,
    ]
})
export class CreditPageModule { }
