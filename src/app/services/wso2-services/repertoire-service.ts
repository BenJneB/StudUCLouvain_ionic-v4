import { HttpClient } from '@angular/common/http';
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
import { Injectable } from '@angular/core';

import { EmployeeItem } from 'src/app/entities/employeeItem';
import { ConnectivityService } from '../utils-services/connectivity-service';
import { Wso2Service } from './wso2-service';

@Injectable()
export class RepertoireService {
    employees: Array<EmployeeItem> = [];
    url = 'directories/v1/employees/';
    options: any;

    constructor(
        public http: HttpClient,
        private wso2Service: Wso2Service,
        private connService: ConnectivityService,
    ) {
    }

    /*Search employees that match with the options & values*/
    public searchEmployees(options: Array<string>, values: Array<string>) {
        this.employees = [];
        let newUrl = this.url;
        newUrl += 'search?';
        for (let i = 0; i < options.length; i++) {
            newUrl += options[i] + '=' + values[i];
            if (i !== options.length - 1) {
                newUrl += '&';
            }
        }
        newUrl += '&page=1&pageSize=10';
        // newUrl += '&directory=E';
        return new Promise(resolve => {
            if (this.connService.isOnline()) {
                this.wso2Service.load(newUrl).subscribe(
                    data => {
                        if (data['persons'] !== null) {
                            this.extractEmployees(data['persons'].person);
                        }
                        resolve(this.employees);
                    });
            } else {
                this.connService.presentConnectionAlert();
                resolve(this.employees);
            }
        });
    }

    /*Load the details for a selected employee*/
    public loadEmpDetails(emp: EmployeeItem) {
        return new Promise(resolve => {

            const url_details = this.url + emp.matric_fgs + '/detail';

            this.wso2Service.load(url_details).subscribe(
                data => {
                    emp = this.extractEmployeeDetails(emp, data['businessInformation']);
                    resolve({empDetails: emp});
                });
        });
    }

    /*Extract the employees*/
    private extractEmployees(data: any) {
        if (data !== null) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const employee = new EmployeeItem(item.matric_fgs, item.lastname, item.firstname, item.email, item.departments);
                this.employees.push(employee);
            }
        }
    }

    /*Extract the details for a selected employee*/
    private extractEmployeeDetails(emp: EmployeeItem, data: any): EmployeeItem {
        emp.address = data.address;
        emp.contracts = data.contracts;
        emp.businessContacts = data.businessContacts;
        emp.gender = data.gender;
        emp.photo_url = data.photo_url;
        // let employee = new EmployeeItem(emp.matric_fgs, emp.lastname, emp.firstname, emp.email, emp.departments,
        // data.address, data.businessContacts, data.contracts, data.gender, data.photo_url);
        return emp;
    }
}
