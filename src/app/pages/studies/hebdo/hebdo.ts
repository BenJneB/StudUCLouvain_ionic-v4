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

import { Component } from '@angular/core';
import { NavController, NavParams, IonItemSliding, ToastController, ModalController  } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from './../../../services/utils-services/utils-services';
import { UserService } from '../../../services/utils-services/user-service';
import { AlertService } from 'src/app/services/utils-services/alert-service';

@Component({
  selector: 'page-hebdo',
  templateUrl: 'hebdo.html'
})

export class HebdoPage {
  schedule : Array<any> = this.navParams.get('schedule');
  shownGroup = null;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public userS:UserService,
    public modalCtrl: ModalController,
    private translateService: TranslateService,
    public navParams:NavParams,
    private utilsServices: UtilsService,
    private alertService: AlertService
  ) {

  }

  toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  }

  isGroupShown(group) {
      return this.shownGroup === group;
  }

  /*Add an activity (a session of the course) to the calendar of the smartphone*/
  addToCalendar(slidingItem : IonItemSliding, activity : any){
    let message:string;
    this.translateService.get('COURSE.MESSAGE').subscribe((res:string) => {message=res;});
    const datas = {
      title: activity.name + ' : ' + activity.type,
      location: activity.entityCode,
      start: new Date(activity.eventstarttime),
      end: new Date(activity.eventendtime)
    };
    this.utilsServices.createEventInCalendar(datas, message, slidingItem);
      this.utilsServices.alertService({'warning': 'COURSE.WARNING', 'message': 'COURSE.MESSAGE3'});
  }
}
