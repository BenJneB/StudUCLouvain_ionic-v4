import { AlertService } from 'src/app/services/utils-services/alert-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors : Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date : 2018-2019
    This file is part of Stud.UCLouvain
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    Stud.UCLouvain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Stud.UCLouvain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.
*/

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../services/utils-services/user-service';

@Component({
  selector: 'page-param',
  templateUrl: 'param.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class ParamPage {
  title: any;
  shownGroup = null;
  setting2: string = 'Langue';


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userS:UserService,
    private alertCtrl : AlertController,
    private translateService: TranslateService,
    private alertService: AlertService
  )
  {
    this.translateService.get('MENU.SETTINGS').subscribe((res: string) => {this.title=res;});
  }

  /*Create and display an alert for the choice of campus and save the choice of the user in the public variable*/
  async campus_choice() {
    let check = this.userS.campus;
    let setting, message, save;
    this.translateService.get('HOME.SETTING1').subscribe((res: string) => {setting=res;});
    this.translateService.get('HOME.MESSAGE').subscribe((res: string) => {message=res;});
    this.translateService.get('HOME.SAVE').subscribe((res: string) => {save=res;});
    let settingsAlert = await this.alertCtrl.create({
      header: setting,
      message: message,
      inputs : [
        {
          type:'radio',
          label:'Louvain-la-Neuve',
          value:'LLN',
          checked:(check === 'LLN')
        },
        {
          type:'radio',
          label:'Woluwé',
          value:'Woluwe',
          checked:(check === 'Woluwe')
        },
        {
          type:'radio',
          label:'Mons',
          value:'Mons',
          checked:(check === 'Mons')
        },
        {
          type:'radio',
          label:'Tournai',
          value:'Tournai',
          disabled:true,
        },
        {
          type:'radio',
          label:'St-Gilles',
          value:'StG',
          disabled:true
        }],
      buttons: [
      {
        text: save,
        handler: data => {
          this.userS.addCampus(data);
        }
      }]
    });
    await settingsAlert.present();
  }

  /*Create and display an alert for the choice of language and save the choice of the user in the public variable*/
  async language_choice() {
    let check2 = this.translateService.currentLang;
    let message2, en, fr, setting2, save: string;
    this.translateService.get('HOME.SETTING2').subscribe((res: string) => {setting2=res;});
    this.translateService.get('HOME.MESSAGE2').subscribe((res: string) => {message2=res;});
    this.translateService.get('HOME.FR').subscribe((res: string) => {fr=res;});
    this.translateService.get('HOME.EN').subscribe((res: string) => {en=res;});
    this.translateService.get('HOME.SAVE').subscribe((res: string) => {save=res;});
    let languageAlert = await this.alertService.languageAlert(setting2, message2, fr, check2, en, save);
    await languageAlert.present();
  }

  openTuto() {
    this.navCtrl.navigateForward('/tutos');
  }
}
