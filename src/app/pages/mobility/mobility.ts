/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Daubry Benjamin & Marchesini Bruno
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
import { NavController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

@Component({
  selector: 'page-mobility',
  templateUrl: 'mobility.html'
})

export class MobilityPage {
  public title: any;
  carpoolingPage;
  busPage;
  trainPage;
  constructor(
    public nav: NavController,
    public market: Market,
    private translateService: TranslateService,
    private utilsServices: UtilsService
  )
  {
    this.title = "Mobilité";
    let titlecar:string;
    this.translateService.get('MOBI.COVOIT').subscribe((res:string) => {titlecar=res;});

    //Information to launch external app
    this.carpoolingPage = { title: titlecar, component: 'CarpoolingPage',
                            iosSchemaName: 'id1143545052',
                            androidPackageName: 'net.commuty.mobile',
                            appUrl: 'commutynet://', httpUrl: 'https://app.commuty.net/sign-in' };
    this.busPage = { title: 'NextRide', component: 'BusPage',
                            iosSchemaName: 'id568042532',
                            androidPackageName: 'be.thomashermine.prochainbus',
                            appUrl: 'nextride://', httpUrl: 'https://nextride.be/timetables' };
    this.trainPage = { title: 'SNCB', component: 'TrainPage',
                            iosSchemaName: 'id403212064',
                            androidPackageName: 'de.hafas.android.sncbnmbs',
                            appUrl: 'sncb://', httpUrl: 'http://www.belgianrail.be/fr/service-clientele/outils-voyage.aspx' };
  }
}
