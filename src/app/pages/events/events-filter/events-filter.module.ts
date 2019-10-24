import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsFilterPage } from './events-filter';
import { EventsService } from 'src/app/services/rss-services/events-service';

@NgModule({
  declarations: [EventsFilterPage],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  entryComponents: [
    EventsFilterPage
  ],
    providers: [
        EventsService,
    ]
})
export class EventsFilterModule { }
