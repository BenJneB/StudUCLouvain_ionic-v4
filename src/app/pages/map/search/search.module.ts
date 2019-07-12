import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SearchModal } from './search';

@NgModule({
  declarations: [
    SearchModal
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  entryComponents: [
    SearchModal
  ]
})
export class SearchModalModule { }
