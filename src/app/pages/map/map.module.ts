import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MapPage } from './map';
import { SearchModalModule } from './search/search.module';
import { POIService } from 'src/app/services/map-services/poi-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapService } from 'src/app/services/map-services/map-service';
import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
    declarations: [MapPage],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SearchModalModule,
        TranslateModule.forChild(),
        MapRoutingModule,
        LeafletModule
    ],
    providers: [
        POIService,
        Geolocation,
        MapService
    ],
})
export class MapPageModule {
}
