import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SportsFilterPage } from './sports-filter';
import { SportsService } from 'src/app/services/rss-services/sports-service';

@NgModule({
    declarations: [SportsFilterPage],
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        TranslateModule.forChild(),
    ],
    entryComponents: [
        SportsFilterPage
    ],
    providers: [
        SportsService,
    ]
})
export class SportsFilterPageModule {
}
