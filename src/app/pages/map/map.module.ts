import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MapPage } from './map';
import { SearchModalModule } from './search/search.module';
import { POIService } from '../../services/map-services/poi-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapService } from '../../services/map-services/map-service';

@NgModule({
  declarations: [MapPage],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SearchModalModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: MapPage
      }
    ])
  ],
  providers: [
    POIService,
    Geolocation,
      MapService
  ],
})
export class MapPageModule { }
