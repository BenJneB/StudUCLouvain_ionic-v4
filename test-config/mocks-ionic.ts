import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Market } from '@ionic-native/market/ngx';

export class MarketMock extends Market {
    open(appId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export class AppAvailabilityMock extends AppAvailability {
    check(app: string): Promise<boolean> {
        let response: boolean;
        return new Promise((resolve, reject) => {
            resolve(response);
        });
    }
}
