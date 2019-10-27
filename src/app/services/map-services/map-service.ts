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
// This code is inspired from the great Josh Morony tutorials:
// https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, Platform } from '@ionic/angular';

import { MapLocation } from 'src/app/entities/mapLocation';
import { ConnectivityService } from '../utils-services/connectivity-service';
import { UserService } from '../utils-services/user-service';

@Injectable()
export class MapService {

    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialised = false;
    markersB: any = [];
    apiKey: string;
    userLocation: MapLocation;
    onDevice: boolean;

    campusLocations = {
        'LLN': {
            lat: 50.66808100000001,
            lng: 4.611832400000026
        },
        'Woluwe': {
            lat: 50.8489094,
            lng: 4.432088300000032
        },
        'Mons': {
            lat: 50.45424080000001,
            lng: 3.956658999999945
        }
    };

    constructor(public connectivityService: ConnectivityService,
                private geolocation: Geolocation,
                private platform: Platform,
                public menuCtrl: MenuController,
                public userS: UserService) {
    }

    getCampusLocation(campus) {
        const coord = this.campusLocations[campus];
        return {lat: coord.lat, lng: coord.lng};
    }

    getUserLocation(): Promise<any> {
        return new Promise((resolve) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                resolve({lat: resp.coords.latitude, lng: resp.coords.longitude});
            });
        });
    }
}
