import { PipeModule } from 'src/app/pipes/pipe.module';
import { MapService } from 'src/app/services/map-services/map-service';
import { POIService } from 'src/app/services/map-services/poi-service';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MapPage } from './map';
import { MapRoutingModule } from './map-routing.module';
import { SearchModal } from './search/search';

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
        HttpClientModule,
        PipeModule
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
