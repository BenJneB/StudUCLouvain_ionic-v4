import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SportsFilterPage } from './sports-filter';

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
   ]
})
export class SportsFilterPageModule { }