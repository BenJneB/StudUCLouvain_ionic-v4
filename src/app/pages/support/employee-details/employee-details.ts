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
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { EmployeeItem } from '../../../entity/employeeItem';
import { ConnectivityService } from '../../../services/utils-services/connectivity-service';
import { RepertoireService } from '../../../services/wso2-services/repertoire-service';

@Component({
  selector: 'page-employee-details',
  templateUrl: 'employee-details.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class EmployeeDetailsPage {
  empDetails: EmployeeItem;
  shownGroup = null;
  address: any;
  searching: boolean = false;

  constructor(public navCtrl: NavController, private route: ActivatedRoute, private router: Router, public repService: RepertoireService, public connService: ConnectivityService) {
        this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {
        this.empDetails = this.router.getCurrentNavigation().extras.state.items;
      }
      this.searching = true;
   // Check if the connexion is Ok before search details pour an employee
    if (this.connService.isOnline()) {
      this.repService.loadEmpDetails(this.empDetails).then(
        res => {
          let result: any = res;
          this.empDetails = result.empDetails;
          console.log(this.empDetails);
          this.searching = false;
        }
      );
    }
   // if not return to previous page and pop up an alert
    else {
      this.searching = false;
      this.connService.presentConnectionAlert();
    }
    });

  }

  ngOnInit() {
  }

  /*Open page with some aditionnal information*/
  openPage(url: string) {
   // InAppBrowser.open(url, '_blank');
    window.open(url, '_blank');
  }
}
