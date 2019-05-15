import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsDetailsPage } from './events-details';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventsDetailsPage],
  imports: [
      IonicModule,
      FormsModule,
      TranslateModule.forChild(),
      RouterModule.forChild([
      {
        path: '',
        component: EventsDetailsPage
      }
    ])
  ]
})
export class EventsDetailsPageModule { }
