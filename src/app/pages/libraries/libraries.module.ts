import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LibrariesPage } from './libraries';
import { LibrariesService } from '../../services/wso2-services/libraries-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { LibrariesRoutingModule } from './libraries-routing.module';

@NgModule({
  declarations: [LibrariesPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    LibrariesRoutingModule
  ],
    providers: [
        LibrariesService,
        ConnectivityService,
    ]
})
export class LibrariesPageModule { }
