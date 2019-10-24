import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsPage } from './pages/events';
import { EventsFilterModule } from './pages/events-filter/events-filter.module';
import { EventsService } from 'src/app/services/rss-services/events-service';
import { EventsRoutingModule } from './events-routing.module';
import { EventsDetailsPage } from './pages/events-details/events-details';

@NgModule({
    declarations: [EventsPage, EventsDetailsPage],
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
