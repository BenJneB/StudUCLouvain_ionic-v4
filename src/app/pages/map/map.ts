import { featureGroup, icon, latLng, Layer, Map, marker, tileLayer } from 'leaflet';
import { MapService } from 'src/app/services/map-services/map-service';
import { UserService } from 'src/app/services/utils-services/user-service';

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

import { POIService } from '../../services/map-services/poi-service';
import { SearchModal } from './search/search';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
})
export class MapPage {

  title: any;
  map: Map;
  zones: any;
  userPosition: marker;
  userIcon: icon;
  building: marker;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public poilocations: POIService,
    public mapService: MapService,
    public userService: UserService) {
    this.title = 'Carte';
    this.userIcon = icon({
      iconUrl: 'assets/img/user-icon.png',
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.loadmap();
      this.poilocations.loadResources().then(results => {
        this.zones = results;
      });
    });
  }

  loadmap() {
    this.map = new Map('map').setView(this.mapService.getCampusLocation(this.userService.campus), 14);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);
    this.map.on('popupopen', function (e) {
      const px = this.map.project(e.popup._latlng);
      px.y -= e.popup._container.clientHeight / 2;
      this.map.panTo(this.map.unproject(px), { animate: true });
    });
    this.showUserPosition();
  }

  async showSearch() {
    const modal = await this.modalCtrl.create({
      component: SearchModal,
      componentProps: {},
      cssClass: 'search-modal'
    });
    modal.onDidDismiss().then(data => {
      const item = data.data;
      this.showBuilding(item);
    });
    await modal.present();
  }

  showUserPosition() {
    this.mapService.getUserLocation().then(coord => {
      this.userPosition = marker(coord, { icon: this.userIcon }).addTo(this.map);
    });
  }

  showBuilding(item) {
    // update or create building marker
    if (this.building) {
      this.building.setLatLng([item.pos.lat, item.pos.lng]).bindPopup(this.generatePopupContent(item)).openPopup();
    } else {
      this.building = marker([item.pos.lat, item.pos.lng]).addTo(this.map).bindPopup(this.generatePopupContent(item)).openPopup();
      this.building._icon.style.filter = 'hue-rotate(300deg)';
    }
    this.fitMap();
  }

  fitMap() {
    this.map.fitBounds(featureGroup([this.userPosition, this.building, this.building.popup]).getBounds(), { padding: [50, 50] });
  }

  generatePopupContent(item) {
    return `<div>
                <p class="popup-title">${item.id}</p>
                <p style="width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</p>
                <img style="width:150px; height: auto;" src="${item.img}">
                <p style="width: 150px; word-wrap: break-word;">${item.address}</p>
              </div>`;
  }




  // if(platform.is('android')){
  //     if("geo" in this.item){
  //       this.url = "geo:0,0?q="+this.item.geo.label;
  //       this.urlSanitized = this.sanitizer.bypassSecurityTrustUrl(this.url);
  //     }
  // }
  // if(platform.is('ios')){
  //     if("geo" in this.item){
  //       this.url = "http://maps.apple.com/?q="+this.item.geo.label;
  //       this.urlSanitized = this.sanitizer.bypassSecurityTrustUrl(this.url);
  //     }
  // }

}
