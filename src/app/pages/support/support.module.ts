import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SupportPage } from './support';
import { RepertoireService } from '../../services/wso2-services/repertoire-service';

@NgModule({
  declarations: [SupportPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: SupportPage
      }
    ])
  ],
  providers: [
    RepertoireService,
  ]
})
export class SupportPageModule { }
