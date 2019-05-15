/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors : Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibraryItem } from '../../entity/libraryItem';
import { MapLocation } from '../../entity/mapLocation';
import { TimeSlot } from '../../entity/timeSlot';
import { Wso2Service} from './wso2-service';




@Injectable({ 
  providedIn: 'root' 
})
export class LibrariesService {
  libraries:Array<LibraryItem> = [];
  url = 'libraries/v1/list';
  options: any;

  constructor(public http: HttpClient, private wso2Service: Wso2Service) {
  }

  /*Load the list of the libraries*/
  public loadLibraries() {
    this.libraries = [];
    return new Promise(resolve => {
      this.wso2Service.load(this.url).subscribe(
        data => {
          this.extractLibraries(data['return'].library);
          resolve({libraries:this.libraries});
        });
    });
  }

  /*Load the details of a specific library, the library selected by the user*/
  public loadLibDetails(lib:LibraryItem) {
    return new Promise(resolve => {
      let url_details = this.url + '/' + lib.id;
      this.wso2Service.load(url_details).subscribe(
        data => {
          lib = this.extractLibraryDetails(lib, data['return'].library);
          resolve({libDetails:lib});
        });
    });
  }

  /*Extract the list of the libraries*/
  private extractLibraries(data: any) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let library = new LibraryItem(item.id, item.name);
      this.libraries.push(library);
    }
  }

  /*Extract all the details for a specific library, the library selected by the user*/
  /*Retrieves all the necessary information*/
  private extractLibraryDetails(lib : LibraryItem, data: any): LibraryItem {
    if ( data.locationId === null ) {
      lib.locationId = -1;
    } else {
      lib.locationId = data.locationId;
    }
    if ( data.mapLocation === null ) {
      lib.mapLocation = new MapLocation(lib.name, '', '', '', '');
    } else {
      lib.mapLocation = new MapLocation(lib.name, data.address.street + ', ' + data.address.postalCode + ', ' + data.address.locality, '', '', ''); // TODO update maplocation with lat lng code
    }
    if ( data.phone === null ) {
      lib.phone = '';
    } else {
      lib.phone = data.phone.substr(3);
    }
    if ( data.email === null ) {
      lib.email = false;
    } else {
      lib.email = data.email;
    }
    if ( data.website === null ) {
      lib.website = '';
    } else {
      lib.website = data.website;
    }
    if (data.openingHours) {
      this.getOpeningHours(data.openingHours, lib.openingHours);
    }
    if (data.openingExaminationHours) {
      this.getOpeningHours(data.openingExaminationHours, lib.openingExaminationHours);
    }
    if (data.openingSummerHours) {
      this.getOpeningHours(data.openingSummerHours, lib.openingSummerHours);
    }

    lib.openingHoursNote = data.openingHoursNote;

    if (data.closedDates.length === undefined) {
      lib.closedDates = [data.closedDates];
    } else {
      lib.closedDates = data.closedDates;
    }
    return lib;
  }

  private getOpeningHours(data: any, lib: Array<TimeSlot>) {
    for (let i = 0; i < data.length; i++) {
      lib.push(new TimeSlot(data[i].day, data[i].startHour, data[i].endHour));
    }
  }
}
