import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SettingsPage } from './settings';
import { TransService } from 'src/app/services/utils-services/trans-services';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
    declarations: [SettingsPage],
    imports: [
        IonicModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SettingsRoutingModule
    ],
    providers: [
        TransService,
    ]
})
export class SettingsPageModule {
}
