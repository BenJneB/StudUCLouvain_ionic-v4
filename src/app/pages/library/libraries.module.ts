import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LibrariesPage } from './libraries';
import { LibrariesService } from '../../services/wso2-services/libraries-service';

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
  ]
})
export class LibrariesPageModule { }
