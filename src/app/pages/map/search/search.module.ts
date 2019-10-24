import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SearchModal } from './search';
import { POIService } from 'src/app/services/map-services/poi-service';

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
  ],
    providers: [
        POIService
    ]
})
export class SearchModalModule { }
