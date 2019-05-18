import { AlertService } from 'src/app/services/utils-services/alert-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

/**
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors: Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date: 2018-2019
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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { TransService } from '../../services/utils-services/trans-services';
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
  setting2 = 'Langue';


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userS: UserService,
    private translateService: TranslateService,
    private alertService: AlertService,
    private transService: TransService
  ) {
    this.title = this.transService.getTranslation('MENU.SETTINGS');
  }

  /*Create and display an alert for the choice of campus and save the choice of the user in the public variable*/
  async campus_choice() {
    const check = this.userS.campus;
    const setting = this.transService.getTranslation('HOME.SETTING1');
    const message = this.transService.getTranslation('HOME.MESSAGE');
    const save = this.transService.getTranslation('HOME.SAVE');
    await this.alertService.campusChoiceAlert(setting, message, check, save);
  }

  /*Create and display an alert for the choice of language and save the choice of the user in the public variable*/
  async language_choice() {
    const check2 = this.translateService.currentLang;
    const setting = this.transService.getTranslation('HOME.SETTING2');
    const message = this.transService.getTranslation('HOME.MESSAGE2');
    const save = this.transService.getTranslation('HOME.SAVE');
    const fr = this.transService.getTranslation('HOME.FR');
    const en = this.transService.getTranslation('HOME.EN');
    const languageAlert = await this.alertService.languageAlert(setting, message, fr, check2, en, save);
    await languageAlert.present();
  }

  openTuto() {
    this.navCtrl.navigateForward('/tutos');
  }
}
