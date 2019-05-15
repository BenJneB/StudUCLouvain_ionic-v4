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

import { MapLocation } from './mapLocation';
import { TimeSlot } from './timeSlot';

export class LibraryItem {
  id: number;
  name: string;
  locationId: number;
  mapLocation: MapLocation;
  phone: string;
  email: boolean;
  website: string;
  openingHours: Array<TimeSlot>;
  openingExaminationHours: Array<TimeSlot>;
  openingSummerHours: Array<TimeSlot>;
  openingHoursNote: string;
  closedDates: Array< {from: string, description: string}>;

  constructor(
    id: number,
    name: string,
    locationId?: number,
    mapLocation?: MapLocation,
    phone?: string,
    email?: boolean,
    website?: string,
    openingHours?: Array<TimeSlot>,
    openingExaminationHours?: Array<TimeSlot>,
    openingSummerHours?: Array<TimeSlot>,
    openingHoursNote?: string,
    closedDates?: Array< {from: string, description: string}>
  ) {
    this.id = id;
    this.name = name;
    this.locationId = locationId;
    this.mapLocation = mapLocation;
    this.phone = phone;
    this.email = email;
    this.website = website;
    this.openingHours = openingHours || [];
    this.openingExaminationHours = openingExaminationHours || [];
    this.openingSummerHours = openingSummerHours || [];
    this.openingHoursNote = openingHoursNote;
    this.closedDates = closedDates || [];
  }
}
