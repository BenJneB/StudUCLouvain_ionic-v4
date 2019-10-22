import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ModalProjectPageModule } from './modal-project/modal-project.module';
import { StudiesPage } from './studies';
import { StudentService } from '../../services/wso2-services/student-service';
import { StudiesService } from '../../services/studies-services/studies-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { TransService } from '../../services/utils-services/trans-services';

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
  ],
  providers: [
    StudentService,
    StudiesService,
    ConnectivityService,
    TransService,
  ]
})
export class StudiesPageModule { }
