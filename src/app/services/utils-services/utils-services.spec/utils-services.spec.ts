import { CacheService } from 'ionic-cache';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AlertController } from '@ionic/angular';

import { UtilsService } from '../utils-services';
import { newMockAlertService, newMockConnectivityService, newMockUserService } from 'test-config/MockUtilsService';
import { newMockNavController, newMockTranslateService } from 'test-config/Mock';
import { Router } from '@angular/router';

function newServiceInstance() {
    const alertService = newMockAlertService();
    const navCtrl = newMockNavController();
    const connectivityService = newMockConnectivityService();
    const translate = newMockTranslateService();
    const user = newMockUserService();
    let alert: AlertController, app: AppAvailability, market: Market, iab: InAppBrowser, device: Device, cache: CacheService,
        router: Router, calendar: Calendar;
    return new UtilsService(
        user, translate,
        alert, app, market, iab, device, cache,
        connectivityService,
        router, calendar,
        alertService, navCtrl
    );
}

describe('UtilsService', () => {
    let service: UtilsService;

    beforeEach(() => {
        service = newServiceInstance();
    });

    it('should create service', () => expect(service).toBeDefined());

    describe('addFavorite method', () => {
        it('should call removeFavorite if has favorite', () => {
            const spyRemove = spyOn(service, 'removeFavorite').and.callFake(() => {
            });
            spyOn(service.user, 'hasFavorite').and.callThrough().and.returnValue(true);
            service.addFavorite({guid: {}}, {});
            expect(spyRemove.calls.count()).toEqual(1);
        });

        it('should call addFavorite from UserService if not has favorite and present toast', () => {
            const spyAdd = spyOn(service.user, 'addFavorite').and.callThrough();
            const spyPresent = spyOn(service.alertService, 'presentToast').and.callFake(() => {
            });
            spyOn(service.user, 'hasFavorite').and.callThrough().and.returnValue(false);
            service.addFavorite({guid: {}}, {});
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyPresent.calls.count()).toEqual(1);
        });
    });

    describe('goToDetail method', () => {
        it('should call navigateForward from NavController', () => {
            const spyNavigate = spyOn(service.navCtrl, 'navigateForward').and.callThrough();
            service.goToDetail({}, 'page');
            expect(spyNavigate.calls.count()).toEqual(1);
        });
    });
});
