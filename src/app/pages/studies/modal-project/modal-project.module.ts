import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProjectPage } from './modal-project';
import { StudiesService } from '../../../services/studies-services/studies-service';

@NgModule({
  declarations: [ModalProjectPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
  ],
  entryComponents: [
    ModalProjectPage
  ],
  providers: [
    StudiesService,
  ]
})
export class ModalProjectPageModule { }
