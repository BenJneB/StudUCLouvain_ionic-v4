import { MenuController, Platform } from '@ionic/angular';

import { MapService } from '../map-service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from '../../utils-services/user-service';
import { ConnectivityService } from '../../utils-services/connectivity-service';

describe('MapService', () => {
    let mapService: MapService;

    beforeEach(() => {
        let geo: Geolocation, platform: Platform, menuCtrl: MenuController, user: UserService, connService: ConnectivityService;
        mapService = new MapService(connService, geo, platform, menuCtrl, user);
    });

    it('should create service', () => expect(mapService).toBeDefined());

    describe('getCampusLocation method', () => {
        it('should return campus position (lat, lng)', () => {
            mapService.campusLocations['TEST'] = {
                'lat': 0.0,
                'lng': 0.0
            };
            const result = mapService.getCampusLocation('TEST');
            expect(result).toEqual(mapService.campusLocations['TEST']);
        });
    });
});
