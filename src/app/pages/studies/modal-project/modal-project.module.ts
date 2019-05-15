import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProjectPage } from './modal-project';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
   ]
})
export class ModalProjectPageModule { }