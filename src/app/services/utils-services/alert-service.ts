import { Course } from 'src/app/entity/course';

import { Injectable } from '@angular/core';
import { AlertController, IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    public toastCtrl: ToastController,
    public user: UserService,
    private translateService: TranslateService,
    public alertCtrl: AlertController,
    private viewCtrl: ModalController,
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
          handler: () => { }
        }
      ]
    });
    return await disclaimerAlert.present().then();
  }

  async languageAlert(settings: any, message2: any, fr: any, check2: string, en: string, save: any) {
    return await this.alertCtrl.create({
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
    if (slidingItem !== undefined) {
      await slidingItem.close();
    }
    return await toast.present().then();

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
    return await settingsAlert.present();
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
    return await toast.present().then();
  }

  private dismissFilterToast(results: any, dateRange: any, data?: any) {
    if (typeof data === 'undefined') {
      data = [];
    }
    results.push(data);
    results.push(dateRange);
    this.viewCtrl.dismiss(results).then();
    return results;
  }

  applyFilters(categories: any, dateRange: any) {
    let results: any = [];
    const excludedFilters = categories.filter(c => !c.isChecked).map(c => c.name);
    results = this.dismissFilterToast(results, dateRange, excludedFilters);
  }

  async showPromptStudies(listCourses: Course[], check: (already: boolean, acronym: string) => any) {
    const { addcourse, message, sigle, cancel, save }: {
      addcourse: string; message: string; sigle: string; cancel: string; save: string;
    } = this.getPromptTexts();
    const prompt = await this.alertCtrl.create({
      header: addcourse,
      message: message,
      inputs: [
        {
          name: 'acronym',
          placeholder: sigle
        }
      ],
      buttons: [
        { text: cancel },
        {
          text: save,
          cssClass: 'save',
          handler: data => {
            this.handleSavePrompt(data, listCourses, check);
          }
        }
      ]
    });
    return await prompt.present().then();
  }

  private handleSavePrompt(data: any, listCourses: Course[], check: (already: boolean, acronym: string) => any) {
    const acro = data.acronym.toUpperCase();
    let already = false;
    for (const item of listCourses) {
      if (item.acronym === acro) {
        already = true;
      }
    }
    check(already, acro);
  }

  private getPromptTexts() {
    let addcourse: string, message: string, sigle: string, cancel: string, save: string;
    this.translateService.get('STUDY.ADDCOURSE').subscribe((res: string) => { addcourse = res; });
    this.translateService.get('STUDY.MESSAGE').subscribe((res: string) => { message = res; });
    this.translateService.get('STUDY.SIGLE').subscribe((res: string) => { sigle = res; });
    this.translateService.get('STUDY.CANCEL').subscribe((res: string) => { cancel = res; });
    this.translateService.get('STUDY.SAVE').subscribe((res: string) => { save = res; });
    return { addcourse, message, sigle, cancel, save };
  }
}
