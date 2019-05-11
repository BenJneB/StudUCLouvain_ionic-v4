import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
import { IonItemSliding, ToastController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user-service';

@Injectable({
    providedIn: 'root'
  })
  export class UtilsService {
    constructor(
        public toastCtrl: ToastController,
        public user: UserService,
        private translateService: TranslateService,
        public alertCtrl: AlertController
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

      /*Add an event to the favorites*/
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
            const toast = await this.toastCtrl.create({
                message: message,
                duration: 3000
            });
            await toast.present();
            await slidingItem.close();
        }
    }


  /*Remove an event from the favorites*/
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
            const alert = await this.alertCtrl.create({
            header: title,
            message: message,
            buttons: [
                {
                    text: cancel,
                    handler: () => {
                        slidingItem.close();
                    }
                },
                {
                    text: del,
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
}
