import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {SearchModal} from './search';

@NgModule({
     declarations: [
       SearchModal
     ],
     imports: [
       IonicModule,
       CommonModule
     ],
     entryComponents: [
       SearchModal
     ]
})
export class SearchModalModule {}