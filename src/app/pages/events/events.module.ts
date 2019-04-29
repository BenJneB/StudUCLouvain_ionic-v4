import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsPage } from './events';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EventsPage],
  imports: [
  	IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: EventsPage
      }
    ])
  ]
})
export class EventsPageModule { }