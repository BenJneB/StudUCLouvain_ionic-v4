import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LibrariesPage } from './libraries';
import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { LibrariesRoutingModule } from './libraries-routing.module';
import { LibraryDetailsPage } from './library-details/library-details';

@NgModule({
  declarations: [LibrariesPage, LibraryDetailsPage],
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
