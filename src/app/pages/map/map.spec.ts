import { spyFunctionWithCallBackThen, testInstanceCreation } from 'src/app/app.component.spec';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { newModalControllerMock } from 'test-config/MockIonicNative';
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
import { MapPage } from './map';
import { POIService } from 'src/app/services/map-services/poi-service';
import { MapService } from 'src/app/services/map-services/map-service';
import { getMockProvider } from '../../../../test-config/Mock';
import { newMockMapService } from '../../../../test-config/MockMapService';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { LatLngExpression, Marker, Popup } from 'leaflet';

class LeafletMarkerMock extends Marker {
    constructor() {
        super({lat: 0.0, lng: 0.0});
    }

    getPopup() {
        return new Popup();
    }

    setLatLng(a: LatLngExpression) {
        return this;
    }
}

class LeafletMapMock {
    fire() {
    }

    on() {
    }

    addLayer() {
    }
}

describe('Map Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MapPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientModule,
                IonicStorageModule.forRoot(),
                LeafletModule.forRoot()
            ],
            providers: [
                getMockProvider(ModalController, newModalControllerMock),
                Geolocation,
                POIService,
                getMockProvider(MapService, newMockMapService),
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.map = new LeafletMapMock();
        component.building = new LeafletMarkerMock();
    });

    it('should be created', () => {
        testInstanceCreation(component, MapPage);
    });

    describe('ionViewDidEnter method', () => {
        it('should (when platform is ready) load resources and put it into zones. Finally, enable swipe gesture ? ', () => {
            component.zones = '';
            const spyReady = spyFunctionWithCallBackThen(component.platform, 'ready', undefined);
            const spyLoad = spyFunctionWithCallBackThen(component.poilocations, 'loadResources', 'RESULTS');
            const spySwipe = spyOn(component.menuController, 'swipeGesture').and.callThrough();
            component.ionViewDidEnter();
            expect(spyReady.calls.count()).toEqual(1);
            expect(spyLoad.calls.count()).toEqual(1);
            expect(spySwipe.calls.count()).toEqual(1);
            expect(component.zones).toEqual('RESULTS');
        });
    });

    describe('centerMapOnPopupOpen method', () => {
        it('should on from map ?', () => {
            const spyMapOn = spyOn(component.map, 'on').and.callThrough();
            component.centerMapOnPopupOpen();
            expect(spyMapOn.calls.count()).toEqual(1);
        });
    });

    describe('showSearch method', () => {
        it('should create modal', () => {
            // TODO: Test modal present and ondiddismiss
            component.showSearch();
            expect(component.modalCtrl.create.calls.count()).toEqual(1);
        });
    });

    describe('showBuilding method', () => {
        it('should update/create building marker and fire map', () => {
            const spyFire = spyOn(component.map, 'fire').and.callThrough();
            const spyUpdate = spyOn(component, 'updateOrCreateBuildingMarker').and.callFake(() => {
            });
            component.showBuilding({pos: {lat: 0.0, lng: 0.0}});
            expect(spyUpdate.calls.count()).toEqual(1);
            expect(spyFire.calls.count()).toEqual(1);
        });
    });

    describe('updateOrCreateBuildingMarker method', () => {
        it('should generate popup if building defined and set lat/lng', () => {
            const spySet = spyOn(component.building, 'setLatLng').and.callThrough();
            const spyGenerate = spyOn(component, 'generatePopupContent').and.callThrough();
            component.updateOrCreateBuildingMarker({pos: {lat: 0.0, lng: 0.0}});
            expect(spyGenerate.calls.count()).toEqual(1);
            expect(spySet.calls.count()).toEqual(1);
        });

        it('should create marker otherwhise', () => {
            component.building = undefined;
            const spyMarker = spyOn(L, 'marker').and.callThrough();
            component.updateOrCreateBuildingMarker({pos: {lat: 0.0, lng: 0.0}});
            expect(spyMarker.calls.count()).toEqual(1);
        });
    });
});
