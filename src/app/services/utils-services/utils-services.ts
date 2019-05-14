import { AlertService } from 'src/app/services/utils-services/alert-service';
import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
import { IonItemSliding, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user-service';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Market } from '@ionic-native/market/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';
import { CacheService } from 'ionic-cache';
import { ConnectivityService } from './connectivity-service';
import { NavigationExtras, Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';

export const EVENT_TEXTS = {
  'FAV': 'EVENTS.MESSAGEFAV',
  'FAV2': 'EVENTS.MESSAGEFAV2',
  'FAV3': 'EVENTS.MESSAGEFAV3',
  'CANCEL': 'EVENTS.CANCEL',
  'DEL': 'EVENTS.DEL',
};

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(
      public toastCtrl: ToastController,
      public user: UserService,
      private translateService: TranslateService,
      public alertCtrl: AlertController,
      private appAvailability: AppAvailability,
      public market: Market,
      private iab: InAppBrowser,
      private device: Device,
      private cache: CacheService,
      public connService: ConnectivityService,
      private router: Router,
      private calendar: Calendar,
      private alertService: AlertService
  ) { }

  nullSchemas = { ios: null, android: null };
  nullUrls = { app: null, http: null };

  public convertToJson(data: string): Object {
      let res;
      xml2js.parseString(data, { explicitArray: false }, (error, result) => {
          if (error) {
              throw new Error(error);
          } else {
              res = result;
          }
      });
      return res;
  }

async addFavorite(itemData: any, texts: any, slidingItem?: IonItemSliding, update?: () => void) {
        if (this.user.hasFavorite(itemData.guid)) {
          let message: string;
          this.translateService.get(texts['FAV']).subscribe((res: string) => {
              message = res;
          });
          this.removeFavorite(
              slidingItem,
              itemData,
              message,
              {
                  'FAV3': texts['FAV3'],
                  'CANCEL': texts['CANCEL'],
                  'DEL': texts['DEL']
              },
              update
          );
      } else {
          this.user.addFavorite(itemData.guid);
          let message: string;
          this.translateService.get(texts['FAV2']).subscribe((res: string) => {
              message = res;
          });
          await this.alertService.presentToast(message, slidingItem);
      }
  }

  async  removeFavorite(slidingItem: IonItemSliding, itemData: any, title: string, texts: any, update?: () => void) {
      let message: string, cancel: string, del: string;
      this.translateService.get(texts['FAV3']).subscribe((res: string) => {
          message = res;
      });
      this.translateService.get(texts['CANCEL']).subscribe((res: string) => {
          cancel = res;
      });
      this.translateService.get(texts['DEL']).subscribe((res: string) => {
          del = res;
      });
      const alertTexts = { 'title': title, 'message': message, 'cancel': cancel, 'del': del };
      return await this.presentAlert(alertTexts, slidingItem, itemData, update);
  }

  private async presentAlert(texts: {}, slidingItem: IonItemSliding, itemData: any, update: () => void) {
      const alert = await this.alertCtrl.create({
          header: texts['title'],
          message: texts['message'],
          buttons: [
              {
                  text: texts['cancel'],
                  handler: () => {
                      slidingItem.close();
                  }
              },
              {
                  text: texts['del'],
                  handler: () => {
                      this.user.removeFavorite(itemData.guid);
                      slidingItem.close();
                      if (update !== undefined) {
                        update();
                      }
                  }
              }
          ]
      });
      return await alert.present();
  }

  private checkAvailability(check: string, page: any, app: string) {
      this.appAvailability.check(check).then(() => {
        const browser = this.iab.create(page.appUrl, '_system');
        browser.close();
      }, () => {
        this.market.open(app);
      });
  }

  launchExternalApp(page: any) {
      let app: string;
      let check: string;
      if (this.device.platform === 'iOS') {
        app = page.iosSchemaName;
        check = page.appUrl;
      } else if (this.device.platform === 'Android') {
        app = page.androidPackageName;
        check = app;
      } else {
        const browser = this.iab.create(page.httpUrl, '_system');
        browser.close();
      }
      this.checkAvailability(check, page, app);
  }

  filterItems(type: string, items: Array<any>, excluded: Array<any>, dateLimit: Date, search: string) {
      let index: string, title: string, date: Date;
      return items.filter((item) => {
          ({ index, title, date } = this.getFilterFields(type, index, item, title, date));
          return (excluded.indexOf(index) < 0) && (title.toLowerCase().indexOf(search.toLowerCase()) > -1)
          && (Math.floor(date.getTime() / 86400000) <= Math.floor(dateLimit.getTime() / 86400000));
      });
  }

  filterFavoriteItems(item: any, favItems: any[], searchTerm: string) {
      if (item.favorite || this.user.hasFavorite(item.guid)) {
        if (item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          favItems.push(item);
        }
      }
      return favItems;
    }

  private getFilterFields(type: string, index: string, item: any, title: string, date: Date) {
      if (type === 'events') {
          index = item.category;
          title = item.title;
          date = item.startDate;
      } else {
          index = item.sport;
          title = item.sport;
          date = item.date;
      }
      return { index, title, date };
  }

  getPageStruct(page: any) {
      return {
        title: 'MENU.' + page['title'],
        component: '/' + page['route'],
        icon: './assets/img/' + page['icon'] + '.png',
        iosSchemaName: page['schemas']['ios'], androidPackageName: page['schemas']['android'],
        appUrl: page['urls']['app'], httpUrl: page['urls']['http']
      };
  }

  doRefresh(refresher: any, cache: string, load: (segment: string) => void) {
      if (this.connService.isOnline()) {
        this.cache.removeItem(cache);
        load(cache);
      } else {
        this.connService.presentConnectionAlert();
      }
      refresher.target.complete();
    }

  goToDetail(item: any, page: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate( [page], navigationExtras);
  }

  createEventInCalendar(itemData: any, message: string, slidingItem: IonItemSliding) {
    const options: any = {
      firstReminderMinutes: 15
    };
    this.calendar.createEventWithOptions(itemData.title, itemData.location, null, itemData.start, itemData.end, options).then(() => {
      this.alertService.presentToast(message, slidingItem);
    });
  }
}
