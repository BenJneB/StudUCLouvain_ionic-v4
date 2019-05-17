import { AlertService } from 'src/app/services/utils-services/alert-service';

/*
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
import { NavParams } from '@ionic/angular';

import { EventsService } from '../../../services/rss-services/events-service';

@Component({
  selector: 'page-events-filter',
  templateUrl: 'events-filter.html'
})
export class EventsFilterPage {
  categories: Array< {name: string, iconCategory: string, isChecked: boolean}> = [];
  dateRange: any;

  constructor(
    private eventService: EventsService,
    private navParams: NavParams,
    private alertService: AlertService
  ) {
   // passed in array of categories names that should be excluded (unchecked)
        let excludedFilters = this.navParams.get('excludedFilters');
        let filters = this.navParams.get('filters');
        this.dateRange = this.navParams.get('dateRange');
        for (let filterName of filters) {
          this.categories.push({
            name: filterName,
            iconCategory: 'assets/icon/events-icon/' + this.eventService.getIconCategory(filterName) + '.png',
            isChecked: (excludedFilters.indexOf(filterName) === -1)
          });
        }
  }

  /*Reset All of the Toggles to be checked*/
  resetFilters() {
    this.categories.forEach(category => {
      category.isChecked = true;
    });
  }

  /*Uncheck All Sports*/
  uncheckAll() {
    this.categories.forEach(category => {
      category.isChecked = false;
    });
  }
}
