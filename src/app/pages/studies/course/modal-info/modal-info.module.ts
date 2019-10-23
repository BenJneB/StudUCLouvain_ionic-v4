import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalInfoPage } from './modal-info';
import { StudentService } from '../../../../services/wso2-services/student-service';
import { Calendar } from '@ionic-native/calendar/ngx';

@NgModule({
  declarations: [ModalInfoPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
  ],
  entryComponents: [
    ModalInfoPage
  ],
    providers: [
        StudentService,
        Calendar,
    ]
})
export class ModalInfoPageModule { }
