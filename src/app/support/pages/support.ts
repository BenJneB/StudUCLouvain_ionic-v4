import { LoaderService } from 'src/app/services/utils-services/loader-service';
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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { EmployeeItem } from 'src/app/entities/employeeItem';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';

@Component({
    selector: 'page-support',
    templateUrl: 'support.html',
    styleUrls: ['./support.scss'],
    animations: [
        trigger('expand', [
            state('true', style({height: '45px'})),
            state('false', style({height: '0'})),
            transition('void => *', animate('0s')),
            transition('* <=> *', animate('250ms ease-in-out'))
        ])
    ]
})
export class SupportPage {
    title: any;
    shownGroup = null;
    employees: EmployeeItem[];
    searching = false;
    lastname = '';
    firstname = '';
    loading;
    segment = 'aide';
    shownHelp = null;

    constructor(
        private iab: InAppBrowser,
        public repService: RepertoireService,
        public loader: LoaderService,
        private utilsServices: UtilsService
    ) {
        this.title = 'Support';
    }

    /*Take the name and lastname in the good field to do the search and display the result*/
    async update() {
        await this.loader.present('Please wait..');
        const options: Array<string> = [];
        const values: Array<string> = [];
        const fields = [
            {field: this.lastname, text: 'lastname'},
            {field: this.firstname, text: 'firstname'}
        ];
        for (const {field, text} of fields) {
            if (field.length > 0) {
                values.push(field);
                options.push(text);
            }
        }
        this.searchEmployees(options, values);
    }

    toggleGroup(category: string) {
        this.shownGroup = this.utilsServices.toggleGroup(category, this.shownGroup);
    }

    /*Search employees with the name and lastname in option, return the result and dismiss the loading pop up*/
    async searchEmployees(options: Array<string>, values: Array<string>) {
        this.searching = true;
        await this.repService.searchEmployees(options, values).then((res: EmployeeItem[]) => {
            this.employees = res;
        });
        this.searching = false;
        this.loader.dismiss();
    }

    /*Open the page with the details for the employee selectionned*/
    goToEmpDetails(emp: EmployeeItem) {
        this.utilsServices.goToDetail(emp, 'support/employee');
    }

    /*Open url for some details on site of the UCL about support, etc for more informations*/
    public openURL(url: string) {
        this.iab.create(url, '_system', 'location=yes');
    }
}
