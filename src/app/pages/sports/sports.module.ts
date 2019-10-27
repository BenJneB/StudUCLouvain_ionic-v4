import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SportsPage } from './sports';
import { SportsFilterPageModule } from './sports-filter/sports-filter.module';
import { SportsService } from 'src/app/services/rss-services/sports-service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { SportsRoutingModule } from './sports-routing.module';

@NgModule({
    declarations: [SportsPage],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SportsFilterPageModule,
        TranslateModule.forChild(),
        SportsRoutingModule
    ],
    providers: [
        SportsService,
        Calendar,
        ConnectivityService,
    ]
})
export class SportsPageModule {
}
