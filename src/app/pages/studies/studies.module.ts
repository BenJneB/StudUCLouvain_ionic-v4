import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProjectPageModule } from './modal-project/modal-project.module';
import { StudiesPage } from './studies';

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
