/**
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
import { ActionSheetController, ModalController, NavController, Platform } from '@ionic/angular';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { POIService } from '../../services/map-services/poi-service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  title: any;
  map: Map;
  zones: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public poilocations: POIService) {
    this.title = 'Carte';
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadmap();
      this.poilocations.loadResources().then(results => {
        this.zones = results;
      })
    });
  }

  loadmap() {
    setTimeout(() => {
      this.map = new Map('map').setView([50.668867, 4.610416], 14);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(this.map);
    }, 50);
  }
}
