import { ModalProjectPageModule } from './modal-project/modal-project.module';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { StudiesPage } from './studies';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudiesPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalProjectPageModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: StudiesPage
      }
    ])
  ]
})
export class StudiesPageModule { }