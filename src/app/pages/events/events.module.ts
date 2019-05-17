import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsPage } from './events';
import { EventsFilterModule } from './events-filter/events-filter.module';

@NgModule({
  declarations: [EventsPage],
  imports: [
  	IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    EventsFilterModule,
    RouterModule.forChild([
      {
        path: '',
        component: EventsPage
      }
    ])
  ]
})
export class EventsPageModule { }
