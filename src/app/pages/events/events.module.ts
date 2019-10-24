import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsPage } from './events';
import { EventsFilterModule } from './events-filter/events-filter.module';
import { EventsService } from '../../services/rss-services/events-service';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [EventsPage],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    EventsFilterModule,
      EventsRoutingModule
  ],
    providers: [
        EventsService,
    ]
})
export class EventsPageModule { }
