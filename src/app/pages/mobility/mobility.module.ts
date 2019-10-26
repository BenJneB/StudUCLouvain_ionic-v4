import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MobilityPage } from './mobility';
import { MobilityRoutingModule } from './mobility-routing.module';

@NgModule({
    declarations: [MobilityPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        MobilityRoutingModule
    ]
})
export class MobilityPageModule {
}
