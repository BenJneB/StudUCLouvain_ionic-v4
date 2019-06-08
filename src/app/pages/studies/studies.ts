/**
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors: Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date: 2018-2019
    This file is part of Stud.UCLouvain
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    Stud.UCLouvain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Stud.UCLouvain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.
*/
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/services/utils-services/alert-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { isString } from 'util';

import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
    AlertController, MenuController, ModalController, NavController, Platform, ToastController
} from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AdeProject } from '../../entity/adeProject';
import { Course } from '../../entity/course';
import { StudiesService } from '../../services/studies-services/studies-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { TransService } from '../../services/utils-services/trans-services';
import { StudentService } from '../../services/wso2-services/student-service';
import { Wso2Service } from '../../services/wso2-services/wso2-service';
import { ModalProjectPage } from './modal-project/modal-project';

@Component({
  selector: 'page-studies',
  templateUrl: 'studies.html',

})

export class StudiesPage {
  public people: any;
  public data: any;
  private segment = 'prog';
  public listCourses: Course[];
  public course: Course;
  public title = 'Etudes';
  public sessionId: string;
  public project: AdeProject = null;
  private username = '';
  private password = '';
  public error = '';
  status = '';
  sigles: any;
  activities: any = [];
  response: any;
  language;
  private statusInsc = '';
  private prog = '';

  constructor(
    public studiesService: StudiesService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public platform: Platform,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    public connService: ConnectivityService,
    private wso2Service: Wso2Service,
    private studentService: StudentService,
    private transService: TransService,
    private alertService: AlertService,
    private utilsServices: UtilsService
  ) {
    this.initializeSession();
    this.menu.enable(true, 'studiesMenu');
    console.log('BEFORE GET COURSE');
    this.getCourses();
  }

  checkExist(sigle: string): Promise<any> {
    let response: any;
    const year = parseInt(this.project.name.split('-')[0], 10);
    return new Promise(resolve => {
      this.studentService.checkCourse(sigle, year).then(
        (data) => {
          const res: any = data;
          let exist: boolean;
          let nameFR = '';
          let nameEN = '';
          if (res === undefined) {
            exist = false;
          } else {
            const names = res.intituleCompletMap.entry;
            nameFR = names[1].value;
            nameEN = names[0].value;
            exist = true;
          }
          response = { exist: exist, nameFR: nameFR, nameEN: nameEN };
          resolve(response);
        });
    });
  }

  /*Authenticate a student*/
  private login() {
    this.error = '';
    return new Promise(resolve => {
      this.wso2Service.login(this.username, this.password).pipe(
        catchError(error => {
          if (error.status === 400) {
            this.error = this.transService.getTranslation('STUDY.BADLOG');
          } else {
            this.error = this.transService.getTranslation('STUDY.ERROR');
          }
          return error;
        }))
        .subscribe(
          data => {
            if (data !== null) {
              this.status = data.toString();
              resolve(data);
            }
          });
    });
  }

  /*Get course program of student*/
  loadActivities() {
    if (this.connService.isOnline()) {
      this.login().then(() => {
        if (this.status) {
          this.searchActivities();
          this.studentService.getStatus().then((res) => {
            const result: any = res;
            this.statusInsc = result[0].etatInscription;
            this.prog = result[0].intitOffreComplet;
          })
            .catch((err) => {
              console.log('Error during load of inscription status');
            });
        }
      });
    } else {
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  private searchActivities() {
    this.studentService.searchActivities().then((res) => {
      const result: any = res;
      this.sigles = result.activities.activity;
      for (const sigle of this.sigles) {
        this.activities.push({ 'name': '', 'sigle': sigle });
      }
    })
      .catch((err) => { console.log('Error during load of course program'); });
  }

  /*Open modalprojectpage to choose an ade project*/
  async openModalProject() {
    const obj = { sessionId: this.sessionId };
    const myModal = await this.modalCtrl.create({ component: ModalProjectPage, componentProps: obj });
    await myModal.present();
    await myModal.onDidDismiss().then(data => { this.project = data.data; });
  }

  /*Set project and connect to ADE*/
  initializeSession() {
    console.log('INIT');
    if (this.connService.isOnline()) {
      console.log('ONLINE');
      this.studiesService.openSession().then(
        data => {
          console.log('OPEN SESSION', data);
          this.sessionId = data;
          this.storage.get('adeProject').then(
            (dataProject) => {
              console.log('adeProject Got', dataProject);
              this.project = dataProject;
              if (this.project === null || this.project === undefined) {
                this.openModalProject();
              } else {
                this.studiesService.setProject(this.sessionId, this.project.id).then();
              }
            }
          );
        });
    } else {
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  addCourseFromProgram(acro?: string) {
    let already = false;
    for (const item of this.listCourses) {
      if (item.acronym === acro) { already = true; }
    }
    this.checkCourseExisting(already, acro);
  }

  private checkCourseExisting(already: boolean, acro: string) {
    let check;
    if (!already) {
      this.checkExist(acro).then(data2 => {
        check = data2;
        if (check.exist) {
          this.addCourse(acro, check.nameFR);
        } else {
          this.alertService.toastCourse('STUDY.BADCOURSE');
          this.showPrompt();
        }
      });
    } else {
      this.alertService.toastCourse('STUDY.ALCOURSE');
    }
    return check;
  }

  private showPrompt() {
    this.alertService.showPromptStudies(this.listCourses, this.checkCourseExisting.bind(this));
  }

  async addCourse(sigle: string, name: string) {
    this.saveCourse(name, sigle);
    const toast = await this.toastCtrl.create({
      message: 'Cours ajouté',
      duration: 1000,
      position: 'bottom'
    });
    return await toast.present();
  }

  getCourses() {
    console.log('BEFORE GET COURSES ETCCCCé)');
    this.storage.get('listCourses').then((data) => {
      console.log('IN GET STORAGE GETCOURSES');
      if (data === null) {
        this.listCourses = [];
      } else {
        this.listCourses = data;
      }
    });
  }

  saveCourse(name: string, tag: string) {
    const course = new Course(name, tag, null);
    this.listCourses.push(course);
    this.storage.set('listCourses', this.listCourses);
  }

  removeCourse(course: Course) {
    const index = this.listCourses.indexOf(course);
    if (index >= 0) {
      this.listCourses.splice(index, 1);
    }
    this.storage.set('listCourses', this.listCourses);
  }

  openCoursePage(course: Course) {
    const year = parseInt(this.project.name.split('-')[0], 10);
    const navigationExtras: NavigationExtras = {
      state: {
        course: course,
        sessionId: this.sessionId,
        year: year
      }
    };
    this.navCtrl.navigateForward(['/course'], navigationExtras);
  }

  openWeekPage() {
    this.studentService.weekSchedule().then((res) => {
      this.utilsServices.goToDetail(res, 'hebdo');
    });
  }

  async openExamPage() {
    const alert = await this.alertCtrl.create({
      header: 'Indisponible',
      subHeader: 'Cette fonctionnalité n\'est pas encore disponible',
      buttons: ['OK']
    });
    await alert.present();
  }

  launch(url) {
    this.iab.create(url, '_system');
  }
}
