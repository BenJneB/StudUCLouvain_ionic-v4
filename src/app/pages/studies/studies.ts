/*
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
import { AlertService } from 'src/app/services/utils-services/alert-service';
import { TransService } from './../../services/utils-services/trans-services';
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { StudiesService} from '../../services/studies-services/studies-service';
import { StudentService} from '../../services/wso2-services/student-service';
import { Wso2Service} from '../../services/wso2-services/wso2-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { catchError } from 'rxjs/operators';

import { Course } from '../../entity/course';
import { AdeProject } from '../../entity/adeProject';
import { ModalProjectPage } from './modal-project/modal-project';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'page-studies',
  templateUrl: 'studies.html',

})

export class StudiesPage {
  public people: any;
  public data: any;
  segment = 'prog';
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
    public storage:Storage,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public platform: Platform,
    private iab: InAppBrowser,
    public modalCtrl: ModalController,
    public connService: ConnectivityService,
    private translateService: TranslateService,
    private wso2Service: Wso2Service,
    private studentService: StudentService,
    private transService: TransService,
    private alertService: AlertService
  ) {
    this.initializeSession();
    this.menu.enable(true, 'studiesMenu');
    this.getCourses();


  }

  checkExist(sigle: string): Promise<any> {
    let response: any;
    const year = parseInt(this.project.name.split('-')[0], 10);
    return new Promise(resolve => {
      this.studentService.checkCourse(sigle,year).then(
      (data) => {
        let res: any = data;
        let exist: boolean;
        let nameFR = '';
        let nameEN = '';
        if (data === 400) {
          exist=false;
        } else {
          let names = res.intituleCompletMap.entry;
          nameFR = names[1].value;
          nameEN = names[0].value;
          exist=true;
        }
        response = {'exist':exist, 'nameFR':nameFR, 'nameEN':nameEN};
        resolve(response);
      })
      })
  }

 /*Authenticate a student*/
  private login() {
    this.error = '';
  	return new Promise(resolve => {
      this.wso2Service.login(this.username,this.password).pipe(
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
          if (data!= null) {
            this.status =data.toString();
            resolve(data);
          }
        });
    });
  }

  /*Get course program of student*/
  loadActivities() {
    if (this.connService.isOnline()) {
      this.login().then((res) => {
  	  	if (this.status) {
  	  		this.studentService.searchActivities().then((res) => {
  	  			let result: any = res;
  	  			this.sigles = result.activities.activity;
            for(let sigle of this.sigles) {
              this.activities.push({'name':'', 'sigle':sigle});
            }
  	  		})
          .catch((err) => {
            console.log('Error during load of course program');
          });

          this.studentService.getStatus().then((res) => {
            let result: any = res;
            this.statusInsc = result[0].etatInscription;
            this.prog = result[0].intitOffreComplet;
          })
          .catch((err) => {
            console.log('Error during load of inscription status');
          })
  	  	}

    	});
    }
    else {
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  /*Open modalprojectpage to choose an ade project*/
  async openModalProject() {
    let obj = {sessionId: this.sessionId};

    let myModal = await this.modalCtrl.create({component: ModalProjectPage, componentProps: obj});
    await myModal.present();
    await myModal.onDidDismiss().then(data => {
      this.project = data.data;

    });
  }

  /*Set project and connect to ADE*/
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
                this.studiesService.setProject(this.sessionId, this.project.id).then(
                  data => {
                  }
                );
              }
            }
          )
      });
    }
     else {
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  /*Add a course manually, show a prompt to the user for this where he can put the name and the acronym of the course*/
  showPrompt() {
    let addcourse: string;
    let message: string;
    let sigle: string;
    let cancel: string;
    let save: string;
    this.translateService.get('STUDY.ADDCOURSE').subscribe((res: string) => {addcourse = res; });
    this.translateService.get('STUDY.MESSAGE').subscribe((res: string) => {message = res; });
    this.translateService.get('STUDY.SIGLE').subscribe((res: string) => {sigle = res; });
    this.translateService.get('STUDY.CANCEL').subscribe((res: string) => {cancel = res; });
    this.translateService.get('STUDY.SAVE').subscribe((res: string) => {save = res; });
    let prompt = this.alertCtrl.create({
      header: addcourse,
      message: message,
      inputs: [
        {
          name: 'acronym',
          placeholder: sigle
        }
      ],
      buttons: [
        {
          text: cancel,
          handler: data => {
          }
        },
        {
          text: save,
          cssClass: 'save',
          handler: data => {
            let acro = data.acronym.toUpperCase();
            let already = false;
            for(let item of this.listCourses) {
              if (item.acronym === acro) already = true;
            }
            this.checkCourseExisting(already, acro);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  addCourseFromProgram(acro: string) {
    let already = false;
    for(let item of this.listCourses) {
      if (item.acronym === acro) already = true;
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
        }
        else {
          this.alertService.toastCourse('STUDY.BADCOURSE');
          this.showPrompt();
        }
      });
    }
    else {
      this.alertService.toastCourse('STUDY.ALCOURSE');
    }
    return check;
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

  /*Retrieve list of course added previously in the storage*/
  getCourses() {
    this.storage.get('listCourses').then((data) =>
    {
      if (data== null) {
        this.listCourses = []
      } else {
        this.listCourses =data}
    });
  }

  /*Save course into storage*/
  saveCourse(name: string, tag: string) {
    let course = new Course(name,tag, null);
    this.listCourses.push(course);
    this.storage.set('listCourses',this.listCourses);
  }

  /*Remove course from storage*/
  removeCourse(course: Course) {
    const index = this.listCourses.indexOf(course);
    if (index >= 0) {
      this.listCourses.splice(index,1);
    }
    this.storage.set('listCourses',this.listCourses);
  }

  /*Open CoursePage of a course to have the schedule*/
  openCoursePage(course: Course) {
    let year = parseInt(this.project.name.split('-')[0], 10);
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
      let result: any = res;
      this.navCtrl.navigateForward(['HebdoPage', {schedule:result}]);
    });
  }

  unavailableAlert() {

    let alert = this.alertCtrl.create({
      header: 'Indisponible',
      subHeader: 'Cette fonctionnalité n\'est pas encore disponible',
      buttons: ['OK']
    }).then(alert => alert.present());

  }

  openExamPage() {
    this.unavailableAlert();
  }

  /*Launch moodle or ucl portal*/
  launch(url) {
    this.iab.create(url, '_system');
  }
}
