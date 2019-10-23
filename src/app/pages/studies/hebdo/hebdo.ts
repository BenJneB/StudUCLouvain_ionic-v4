import { AlertService } from 'src/app/services/utils-services/alert-service';
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
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../../../services/utils-services/utils-services';

@Component({
  selector: 'page-hebdo',
  templateUrl: 'hebdo.html',
  styleUrls: ['./hebdo.scss'],
})

export class HebdoPage {
  shownGroup = null;
  schedule: Array<any>;
  constructor(
    private translateService: TranslateService,
    private utilsServices: UtilsService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.schedule = this.router.getCurrentNavigation().extras.state.items;
      }
    });
  }
  toggleGroup(date: string) {
    this.shownGroup = this.utilsServices.toggleGroup(date, this.shownGroup);
  }
  /*Add an activity (a session of the course) to the calendar of the smartphone*/
  addToCalendar(slidingItem: IonItemSliding, activity: any) {
      let message = '';
    this.translateService.get('COURSE.MESSAGE').subscribe((res: string) => { message = res; });
    const datas = {
      title: activity.name + ': ' + activity.type,
      location: activity.entityCode,
      start: new Date(activity.eventstarttime),
      end: new Date(activity.eventendtime)
    };
    this.utilsServices.createEventInCalendar(datas, message, slidingItem);
    this.alertService.alertCourse({ 'warning': 'COURSE.WARNING', 'message': 'COURSE.MESSAGE3' });
  }
}
