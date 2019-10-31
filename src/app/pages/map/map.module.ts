import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MapPage } from './map';
import { POIService } from 'src/app/services/map-services/poi-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapService } from 'src/app/services/map-services/map-service';
import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SearchModal } from './search/search';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [MapPage, SearchModal],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TranslateModule.forChild(),
        MapRoutingModule,
        LeafletModule,
        HttpClientModule
    ],
    providers: [
        POIService,
        Geolocation,
        MapService
    ],
    entryComponents: [SearchModal]
})
export class MapPageModule {
}
