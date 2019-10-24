import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SupportPage } from './support';
import { RepertoireService } from '../../services/wso2-services/repertoire-service';
import { SupportRoutingModule } from './support-routing.module';
import { EmployeeDetailsPage } from './employee-details/employee-details';

@NgModule({
  declarations: [SupportPage, EmployeeDetailsPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    SupportRoutingModule
  ],
    providers: [
        RepertoireService,
    ]
})
export class SupportPageModule { }
