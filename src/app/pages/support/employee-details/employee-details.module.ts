import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EmployeeDetailsPage } from './employee-details';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeDetailsPage],
  imports: [
  	IonicModule,
    FormsModule,
    ReactiveFormsModule,
  	CommonModule,
    TranslateModule.forChild(),
  ]
})
export class EmployeeDetailsPageModule { }