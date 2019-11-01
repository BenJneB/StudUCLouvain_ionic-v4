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

import { LibraryItem } from 'src/app/entities/libraryItem';
import { MapLocation } from 'src/app/entities/mapLocation';
import { TimeSlot } from 'src/app/entities/timeSlot';
import { ConnectivityService } from '../utils-services/connectivity-service';
import { Wso2Service } from './wso2-service';

@Injectable()
export class LibrariesService {
    libraries: Array<LibraryItem> = [];
    url = 'libraries/v1/list';
    options: any;

    constructor(
        public http: HttpClient,
        private wso2Service: Wso2Service,
        public connService: ConnectivityService) {
    }

    /*Load the list of the libraries*/
    public loadLibraries() {
        this.libraries = [];
        return new Promise(resolve => {
            this.wso2Service.load(this.url).subscribe(
                data => {
                    this.extractLibraries(data['return'].library);
                    resolve({libraries: this.libraries});
                });
        });
    }

    /*Load the details of a specific library, the library selected by the user*/
    public loadLibDetails(lib: LibraryItem) {
        return new Promise(resolve => {
            if (this.connService.isOnline()) {
                const url_details = this.url + '/' + lib.id;
                this.wso2Service.load(url_details).subscribe(data => resolve(this.extractLibraryDetails(lib, data['return'].library)));
            } else {
                this.connService.presentConnectionAlert();
                resolve(lib);
            }
        });
    }

    /*Extract the list of the libraries*/
    private extractLibraries(data: any) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const library = new LibraryItem(item.id, item.name);
            this.libraries.push(library);
        }
    }

    /*Extract all the details for a specific library, the library selected by the user*/

    /*Retrieves all the necessary information*/
    private extractLibraryDetails(lib: LibraryItem, data: any): LibraryItem {
        console.log(data);
        const mapLocation = new MapLocation(lib.name, '', '', '', '', '');
        if (data.mapLocation) {
            mapLocation.address = `${data.address.street} ,  ${data.address.postalCode} ,  ${data.address.locality}`;
            // TODO update maplocation with lat lng code
        }

        const locationId = data.locationId || -1;
        const closedDates = [data.closedDates] ? data.closedDates.length === undefined : data.closedDates;
        const {email, website, phone, openingHoursNote} = data;
        lib = Object.assign(lib, {email, website, phone, openingHoursNote, locationId, mapLocation, closedDates});

        ['openingHours', 'openingExaminationHours', 'openingSummerHours'].forEach( (property) => {
            lib[property] = [];
            (data[property] || []).forEach(
                (timeSlotRaw: any) => {
                    const timeslot = new TimeSlot(timeSlotRaw.day, timeSlotRaw.startHour, timeSlotRaw.endHour);
                    lib[property].push(timeslot);
                }
            );
        });
        return lib;
    }
}
