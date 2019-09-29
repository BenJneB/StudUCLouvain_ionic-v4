import { EventsService } from 'src/app/services/rss-services/events-service';
import { RssService } from 'src/app/services/rss-services/rss-service';
import { SportsService } from 'src/app/services/rss-services/sports-service';
import { UserService } from 'src/app/services/utils-services/user-service';

import { NavController } from '@ionic/angular';

import { LoaderService } from '../src/app/services/utils-services/loader-service';
import { MockConnectivityService, MockUtilsService, newMockUserService } from './MockUtilsService';
import { HttpClientMock } from './MockWso2Services';

export class MockSportsService extends SportsService {
    constructor(user: UserService, rssService: RssService) {
        super(user, rssService);
    }

    getSports(s: string) {
        return new Promise((resolve, reject) => { });
    }
}

export function newMockSportsService() {
    const user = newMockUserService();
    let rssService: MockRssService;
    return new MockSportsService(user, rssService);
}

export class MockEventsService extends EventsService {
    constructor(user: UserService, rssService: RssService) {
        super(user, rssService);
    }

    getEvents(s: string) {
        return new Promise((resolve, reject) => { });
    }
}

export function newMockEventsService() {
    const user = newMockUserService();
    let rssService: MockRssService;
    return new MockEventsService(user, rssService);
}

export class MockRssService extends RssService {
    constructor(
        http: HttpClientMock,
        navCtrl: NavController,
        utilsServices: MockUtilsService,
        connService: MockConnectivityService,
        loader: LoaderService
    ) {
        super(http, navCtrl, utilsServices, connService, loader);
    }
}

// export function newMockRssService() {
//     public http: HttpClientMock,
//         private; navCtrl: NavController,
//             private; utilsServices: UtilsService,
//                 public; connService: ConnectivityService,
//                     private; loader: LoaderService,;
//     return new MockSportsService(user, rssService);
// }
