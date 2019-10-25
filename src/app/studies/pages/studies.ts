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

import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AdeProject } from 'src/app/entities/adeProject';
import { Course } from 'src/app/entities/course';
import { StudiesService } from 'src/app/services/studies-services/studies-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { TransService } from 'src/app/services/utils-services/trans-services';
import { StudentService } from 'src/app/services/wso2-services/student-service';
import { Wso2Service } from 'src/app/services/wso2-services/wso2-service';
import { ModalProjectPage } from './modal-project/modal-project';

@Component({
  selector: 'page-studies',
  templateUrl: 'studies.html',
  styleUrls: ['./studies.scss'],

})

export class StudiesPage {
  public segment = 'cours';
  public listCourses: Course[];
  public sessionId: string;
  public project: AdeProject = null;
  private username = '';
  private password = '';
  public error = '';
  status = '';
  title = 'Etudes';
  sigles: any;
  activities: any = [];
  private statusInsc = '';
  private prog = '';

  constructor(
    public studiesService: StudiesService,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public storage: Storage,
    public menu: MenuController,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    public connService: ConnectivityService,
    private wso2Service: Wso2Service,
    private studentService: StudentService,
    private transService: TransService,
    private alertService: AlertService,
  ) {
    this.initializeSession();
    this.menu.enable(true, 'studiesMenu');
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
            (data: string) => {
            if (data !== null) {
                this.status = data;
              resolve(data);
            }
          });
    });
  }

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
              .catch(() => {
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
        .catch(() => {
            console.log('Error during load of course program');
        });
  }

  async openModalProject() {
    const obj = { sessionId: this.sessionId };
    const myModal = await this.modalCtrl.create({ component: ModalProjectPage, componentProps: obj }).then();
    myModal.onDidDismiss().then(data => { this.project = data.data; });
    return await myModal.present();
  }

  initializeSession() {
    if (this.connService.isOnline()) {
      this.studiesService.openSession().then(
        data => {
          this.sessionId = data;
          this.storage.get('adeProject').then(
            (dataProject) => {
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
      return await this.alertService.presentToast('Cours ajouté');
  }

  getCourses() {
    this.storage.get('listCourses').then((data) => {
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

  async openExamPage() {
    const alert = await this.alertCtrl.create({
      header: 'Indisponible',
      subHeader: 'Cette fonctionnalité n\'est pas encore disponible',
      buttons: ['OK']
    });
    return await alert.present();
  }

  launch(url) {
    this.iab.create(url, '_system');
  }
}
