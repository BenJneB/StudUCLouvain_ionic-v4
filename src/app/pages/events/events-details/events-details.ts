/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Jérôme Lemaire and Corentin Lamy
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
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../../services/utils-services/user-service';

import { EventItem } from '../../../entity/eventItem';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-events-details',
  templateUrl: 'events-details.html'
})
export class EventsDetailsPage {
  event: EventItem;

  constructor(public navCtrl: NavController,
    public user: UserService,
    private translateService: TranslateService,
    public toastCtrl: ToastController,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.event = this.router.getCurrentNavigation().extras.state.items;
        }
      });
  }

  /*OPEN THE EXTERNAL PAGE OF THE EVENT*/
  public openPage(url: string) {
    window.open(url, '_blank');
  }

  /*ADD EVENT TO FAVORITE*/
  public addFavorite(event : EventItem){
    let message:string;
    this.translateService.get('EVENTS.MESSAGEFAV2').subscribe((res:string) => {message=res;});

    if(!this.user.hasFavorite(event.guid)){
      this.user.addFavorite(event.guid);
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(alert => alert.present());
    }

  }

}
