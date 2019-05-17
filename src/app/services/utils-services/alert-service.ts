import { Injectable } from '@angular/core';
import { IonItemSliding, ToastController, AlertController } from '@ionic/angular';
import { UserService } from './user-service';
import { TranslateService } from '@ngx-translate/core';
import { AlertInput } from '@ionic/core';

@Injectable({
    providedIn: 'root'
  })
  export class AlertService {
    constructor(
        public toastCtrl: ToastController,
        public user: UserService,
        private translateService: TranslateService,
        public alertCtrl: AlertController,
    ) { }

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
                    handler: () => {}
                }
            ]
        });
        return await disclaimerAlert.present();
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

      private languageChanged(event: string) {
        this.user.storage.set('lan', event);
        this.translateService.use(event);
    }

    async presentToast(message: string, slidingItem?: IonItemSliding) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        await toast.present();
        if (slidingItem !== undefined) {
          await slidingItem.close();
        }
    }

    async campusChoiceAlert(setting: string, message: string, check: string, save: string) {
      const settingsAlert = await this.alertCtrl.create({
        header: setting,
        message: message,
        inputs: [
          this.getRadioCampus('Louvain-la-Neuve', 'LLN', check = check),
          this.getRadioCampus('Woluwé', 'Woluwe', check = check),
          this.getRadioCampus('Mons', 'Mons', check = check),
          this.getRadioCampus('Tournai', 'Tournai'),
          this.getRadioCampus('St-Gilles', 'StG'),
        ],
        buttons: [
          {
            text: save,
            handler: data => {
              this.user.addCampus(data);
            }
          }
        ]
      });
      await settingsAlert.present();
    }

  private getRadioCampus(label: string, value: string, check?: string): AlertInput {
    return {
      type: 'radio',
      label: label,
      value: value,
      checked: (check === value),
      disabled: check === undefined ? true : false
    };
  }

  async toastCourse(key: string) {
    let msg: string;
    this.translateService.get(key).subscribe((res: string) => { msg = res; });
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    return await toast.present();
  }
}
