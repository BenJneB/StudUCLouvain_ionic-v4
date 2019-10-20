import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProjectPage } from './modal-project';
import { StudiesService } from '../../../services/studies-services/studies-service';
import { Calendar } from '@ionic-native/calendar/ngx';

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
    Calendar,
  ]
})
export class ModalProjectPageModule { }
