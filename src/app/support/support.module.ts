import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SupportPage } from './pages/support';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';
import { SupportRoutingModule } from './support-routing.module';
import { EmployeeDetailsPage } from './pages/employee-details/employee-details';

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
