import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LibraryDetailsPage } from './library-details';
import { LibrariesService } from '../../../services/wso2-services/libraries-service';

@NgModule({
  declarations: [LibraryDetailsPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: LibraryDetailsPage
      }
    ])
  ],
  providers: [
    LibrariesService,
  ]
})
export class LibraryDetailsPageModule { }
