import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalInfoPage } from './modal-info';

@NgModule({
  declarations: [ModalInfoPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  	CommonModule,
    TranslateModule.forChild(),
  ]
})
export class ModalInfoPageModule { }
