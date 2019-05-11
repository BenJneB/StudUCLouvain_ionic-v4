import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
import { IonItemSliding, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user-service';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Market } from '@ionic-native/market/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';

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
    ) {

    }

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

  async addFavorite(slidingItem: IonItemSliding, itemData: any, texts: any, update: () => void) {
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
            await this.presentToast(message, slidingItem);
        }
    }


    private async presentToast(message: string, slidingItem: IonItemSliding) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        await toast.present();
        await slidingItem.close();
    }

    async  removeFavorite(slidingItem: IonItemSliding, itemData: any, title: string, texts: any, update: () => void) {
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
                        update();
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

    /*Create and display the alert that say that if a course is add to the calendar if this course is changed,
    the calendar doesn't take that in account*/
    async alertCourse(texts) {
        let title: string;
        let message: string;
        this.translateService.get(texts['warning']).subscribe((res: string) => {
            title = res;
        });
        this.translateService.get(texts['message']).subscribe((res: string) => {
            message = res;
        });
        const disclaimerAlert = await this.alertCtrl.create({
            header: title,
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        return await disclaimerAlert.present();
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

    languageAlert(settings: any, message2: any, fr: any, check2: string, en: string, save: any) {
        return this.alertCtrl.create({
          header: settings,
          message: message2,
          inputs: [
            {
              type: 'radio',
              label: fr,
              value: 'fr',
              checked: (check2 === 'fr')
            },
            {
              type: 'radio',
              label: en,
              value: 'en',
              checked: (check2 === 'en')
            }
          ],
          buttons: [
            {
              text: save,
              handler: data => { this.languageChanged(data); }
            }
          ]
        });
      }

    /*When the language change, translate the page with the applied language*/
    private languageChanged(event: string) {
        this.user.storage.set('lan', event);
        this.translateService.use(event);
    }
}
