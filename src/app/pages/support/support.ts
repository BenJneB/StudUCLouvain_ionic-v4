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

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { NavController, ModalController, Platform,LoadingController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { RepertoireService } from '../../services/wso2-services/repertoire-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { EmployeeItem } from '../../entity/employeeItem';
import { LoaderService } from 'src/app/services/utils-services/loader-service';

@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class SupportPage {
  title: any;
  shownGroup = null;
  employees: EmployeeItem[];
  searching: boolean = false;
  lastname = '';
  firstname = '';
  loading;
  segment = 'aide';
  shownHelp = null;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private iab: InAppBrowser,
              public platform: Platform,
              public repService: RepertoireService,
              public connService: ConnectivityService,
              public loader: LoaderService,
              private utilsServices: UtilsService
  )
  {
    this.title = 'Support';
  }

  /*Take the name and lastname in the good field to do the search and display the result*/
  update() {
    this.loader.present('Please wait..');
    let options: Array<string> = [];
    let values: Array<string> = [];
    if (this.lastname.length>0) {
      values.push(this.lastname);
      options.push('lastname');
    }
    if (this.firstname.length>0) {
      values.push(this.firstname);
      options.push('firstname');
    }
    this.searchEmployees(options, values);
  }

  toggleGroup(category: string) {
    this.shownGroup = this.utilsServices.toggleGroup(category, this.shownGroup);
  }

  /*Search employees with the name and lastname in option, return the result and dismiss the loading pop up*/
  searchEmployees(options: Array<string>, values: Array<string>) {
    if (this.connService.isOnline()) {
      this.repService.searchEmployees(options, values).then(
        res => {
          let result: any = res;
          this.employees = result.employees;
          this.searching = true;
        }
      );
    } else {
      this.searching = false;
      this.connService.presentConnectionAlert();
    }
    this.loader.dismiss();
  }

  /*Open the page with the details for the employee selectionned*/
  goToEmpDetails(emp: EmployeeItem) {
    this.utilsServices.goToDetail(emp, 'employee');
  }

  /*Open url for some details on site of the UCL about support, etc for more informations*/
  public openURL(url: string) {
    this.iab.create(url, '_system', 'location=yes');
  }
}
