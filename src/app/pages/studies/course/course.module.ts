import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CoursePage } from './course';
import { ModalInfoPageModule } from './modal-info/modal-info.module';
import { CourseService } from '../../../services/studies-services/course-service';

@NgModule({
  declarations: [CoursePage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalInfoPageModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: CoursePage
      }
    ])
  ],
  providers: [
    CourseService,
  ]
})
export class CoursePageModule { }
