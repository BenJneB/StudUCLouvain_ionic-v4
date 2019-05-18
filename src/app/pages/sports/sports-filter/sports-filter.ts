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
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'page-sports-filter',
  templateUrl: 'sports-filter.html'
})
export class SportsFilterPage {
  categories: Array< {name: string, isChecked: boolean}> = [];
  dateRange: any;

  constructor(
    public navParams: NavParams,
    private alertService: AlertService
    ) {
   //  passed in array of categories names that should be excluded (unchecked)
    const excludedFilters = this.navParams.get('excludedFilters');
    const filters = this.navParams.get('filters');
    this.dateRange = this.navParams.get('dateRange');
    for (const filterName of filters) {
      this.categories.push({
        name: filterName,
        isChecked: (excludedFilters.indexOf(filterName) === -1)
      });
    }
  }

  /*Reset all of the toggles to be checked*/
  resetFilters() {
    this.categories.forEach(category => {
      category.isChecked = true;
    });
  }

  /*Uncheck all sports from the filter*/
  uncheckAll() {
    this.categories.forEach(category => {
      category.isChecked = false;
    });
  }
}
