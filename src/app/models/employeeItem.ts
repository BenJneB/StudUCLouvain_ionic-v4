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

export class EmployeeItem {
    matric_fgs: number;
    lastname: string;
    firstname: string;
    email: string;
    departments: any;
    address: any;
    businessContacts: any;
    contracts: any;
    gender: string;
    photo_url: string;

    constructor(
        matric_fgs: number,
        lastname: string,
        firstname: string,
        email: string,
        departments: any,
        address?: any,
        businessContacts?: Array<any>,
        contracts?: Array<any>,
        gender?: string,
        photo_url?: string
    ) {
        this.matric_fgs = matric_fgs;
        this.lastname = lastname;
        this.firstname = firstname;
        this.email = email;
        this.departments = departments;
        this.address = address;
        this.businessContacts = businessContacts;
        this.contracts = contracts;
        this.gender = gender;
        this.photo_url = photo_url;
    }
}
