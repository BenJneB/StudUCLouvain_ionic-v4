import { map } from 'rxjs/operators';

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

import { MapLocation } from 'src/app/entities/mapLocation';
import { UserService } from '../utils-services/user-service';

@Injectable()
export class POIService {

    zones: any = [];
    url = '';
    urlLLN = 'assets/data/resourcesLLN.json';
    urlMons = 'assets/data/resourcesMons.json';
    urlWol = 'assets/data/resourcesWoluwe.json';
    old = '';

    constructor(public http: HttpClient,
                public user: UserService) {
        this.old = this.user.campus;
        this.update();

    }

    /*Put the good campus for the user to display the good map with the good locations*/
    update() {
        const campus = this.user.campus;
        if (campus === 'LLN') {
            this.url = this.urlLLN;
        }
        if (campus === 'Woluwe') {
            this.url = this.urlWol;
        }
        if (campus === 'Mons') {
            this.url = this.urlMons;
        }
        if (campus !== this.old) {
            this.zones = [];
            this.old = campus;
        }
    }

    /*Load point of interest to load the list of locations and display that*/
    public loadResources() {
        this.update();
        if (this.zones.length === 0) {
            return new Promise(resolve => {
                this.http.get(this.url).pipe(
                    map(res => res)).subscribe(data => {
                    const newZone = this.getZones(data);
                    this.zones.push(newZone);
                    resolve(this.zones);
                });
            });
        } else {
            return new Promise(resolve => {
                resolve(this.zones);
            });
        }
    }

    private getZones(data: Object) {
        const tmpZones = data['zones'];
        const auditoiresLength = tmpZones.auditoires.length;
        const locauxLength = tmpZones.locaux.length;
        const bibliothequesLength = tmpZones.bibliotheques.length;
        const sportsLength = tmpZones.sports.length;
        const restauULength = tmpZones.restaurants_universitaires.length;
        const servicesLength = tmpZones.services.length;
        const parkingsLength = tmpZones.parkings.length;
        return {
            auditoires: this.getCategoryZones(tmpZones.auditoires, auditoiresLength),
            locaux: this.getCategoryZones(tmpZones.locaux, locauxLength),
            bibliotheques: this.getCategoryZones(tmpZones.bibliotheques, bibliothequesLength),
            sports: this.getCategoryZones(tmpZones.sports, sportsLength),
            restaurants_universitaires: this.getCategoryZones(tmpZones.restaurants_universitaires, restauULength),
            services: this.getCategoryZones(tmpZones.services, servicesLength),
            parkings: this.getCategoryZones(tmpZones.parkings, parkingsLength),
            icon: 'arrow-dropdown',
        };
    }

    private compare(a, b) {
        if (a.nom < b.nom) {
            return -1;
        }
        if (a.nom > b.nom) {
            return 1;
        }
        return 0;
    }

    private getCategoryZones(zones: any, length: number) {
        return {
            list: this.createMapLocations(zones.sort(this.compare)),
            listChecked: Array(length).fill(false),
            showDetails: false
        };
    }

    /*Create the locations for a type of places represented by a list (ex: auditoires, parkings, etc)*/
    private createMapLocations(list: any): Array<MapLocation> {
        const locationsList: MapLocation[] = [];
        for (const elem of list) {
            const newLocation = new MapLocation(elem.nom,
                elem.adresse,
                elem.coord.lat,
                elem.coord.lng,
                elem.sigle,
                elem.vignette);
            locationsList.push(newLocation);
        }
        return locationsList;
    }

}
