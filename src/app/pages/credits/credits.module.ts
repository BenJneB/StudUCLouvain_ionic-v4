import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { CreditsPage } from './credits';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CreditsRoutingModule } from './credits-routing.module';

@NgModule({
    declarations: [CreditsPage],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        CreditsRoutingModule
    ],
    providers: [
        AppVersion,
    ]
})
export class CreditPageModule {
}
