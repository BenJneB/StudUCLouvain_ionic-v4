import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpLoaderFactory } from '../app.module';
import { HomePage } from './home.page';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

// import { Http } from '@angular/http';
@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  exports: [TranslateModule],
  providers: [
    SplashScreen,
  ]
})
export class HomePageModule { }
