/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors:  Jérôme Lemaire, Corentin Lamy, Daubry Benjamin & Marchesini Bruno
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

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, ActionSheetController, ModalController } from '@ionic/angular';

import { POIService } from '../../services/map-services/poi-service';
import { MapService } from '../../services/map-services/map-service';

import { MapLocation } from '../../entity/mapLocation';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  showedLocations: MapLocation[] = [];
  zones: any;
  filters: any;
  excludedFilters: any = [];
  selectedLocation: any = [];
  userLocation: any = [];
  showLocationList = false;
  title: any;
  searching: boolean = false;
  temp: any;
  temp2: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public mapService: MapService,
              public platform: Platform,
              public poilocations: POIService)
  {
    console.log('map constr')
      this.title = 'Carte';
  }

  /*ngAfterViewInit() is called after the view is initially rendered, load map and list of positions*/
 /*  ngAfterViewInit() {
    let mapLoaded = this.mapService.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    console.log(mapLoaded);
    let zones = this.poilocations.loadResources();
    this.searching = true;

    Promise.all([
      mapLoaded,
      zones
    ]).then((result) => {
      this.searching = false;
      this.zones = result[1];
      this.filters = this.zones;
      this.userLocation = this.mapService.getUserLocation();
      console.log(this.userLocation);
      this.selectedLocation = this.userLocation;
      this.showedLocations.push(this.selectedLocation);
      if (result[0]) {
        this.mapService.addMarker(this.selectedLocation);
      }
    }, (error) => {
    });
  } */

  ngAfterViewInit() {
    console.log('aft vie in')
		this.platform.ready().then( () => {

      this.mapService.loadMap();
      console.log('after load');
    });
    console.log('end')
	}
  /*Use to display or close the list of a type of positions (auditoires, parkings, bibliotheques, ...)*/
  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'arrow-dropdown';
    } else {
        data.showDetails = true;
        data.icon = 'arrow-dropup';
    }
  }

  /*select or unselect a specific location*/
  toggleLocation(data, checkList, index) {
    if (checkList[index] === true) {
      this.addShowedLocations(data);
      this.onSelect(data);
    } else {
      this.removeShowedLocations(data);
      this.mapService.removeMarker(data);
    }
  }

  /*push a location to display*/
  addShowedLocations(rawLocation) {
    this.showedLocations.push(rawLocation);
  }

  /*remove a location displayed*/
  removeShowedLocations(rawLocation) {
    let locToRemove = this.showedLocations.find(item => item.title === rawLocation.title);
    this.showedLocations.splice(this.showedLocations.indexOf(locToRemove),1);
  }

  /*when select an location*/
  onSelect(data: any) {
    if (this.selectedLocation !== data) {
      this.selectedLocation = data;
    }
    this.mapService.addMarker(this.selectedLocation);
  }
}
