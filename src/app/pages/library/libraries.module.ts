import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LibrariesPage } from './libraries';
import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';

@NgModule({
  declarations: [LibrariesPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: LibrariesPage
      }
    ])
  ],
    providers: [
        LibrariesService,
        ConnectivityService,
    ]
})
export class LibrariesPageModule { }
