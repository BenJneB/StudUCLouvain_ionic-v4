import { MapService } from '../src/app/services/map-services/map-service';
import { MockConnectivityService, MockUserService, newMockConnectivityService, newMockUserService } from './MockUtilsService';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController, Platform } from '@ionic/angular';


export class MockMapService extends MapService {
    constructor(conn: MockConnectivityService, geo: Geolocation, platform: Platform, menuCtrl: MenuController, user: MockUserService) {
        super(conn, geo, platform, menuCtrl, user);
    }
}

export function newMockMapService() {
    const user = newMockUserService();
    const conn = newMockConnectivityService();
    let geo: Geolocation, platform: Platform, menuCtrl: MenuController;
    return new MockMapService(conn, geo, platform, menuCtrl, user);
}
