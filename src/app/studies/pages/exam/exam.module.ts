import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ExamPage } from './exam';
import { Calendar } from '@ionic-native/calendar/ngx';

@NgModule({
    declarations: [ExamPage],
    imports: [
        IonicModule,
        TranslateModule.forChild()
    ],
    providers: [
        Calendar,
    ]
})
export class ExamPageModule {
}
