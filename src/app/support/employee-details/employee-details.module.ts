import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EmployeeDetailsPage } from './employee-details';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';

@NgModule({
  declarations: [EmployeeDetailsPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeDetailsPage
      }
    ])
  ],
    providers: [
        RepertoireService,
        ConnectivityService,
    ]
})
export class EmployeeDetailsPageModule { }
