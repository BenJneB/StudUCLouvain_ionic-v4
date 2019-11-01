import { AlertService } from 'src/app/services/utils-services/alert-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Activity } from 'src/app/entities/activity';
import { Course } from 'src/app/entities/course';
import { CourseService } from 'src/app/services/studies-services/course-service';
import { UserService } from 'src/app/services/utils-services/user-service';
import { ModalInfoPage } from './modal-info/modal-info';

@Component({
    selector: 'page-course',
    templateUrl: 'course.html',
    styleUrls: ['./course.scss'],
})

export class CoursePage implements OnInit {
    sessionId: string;
    course: Course;
    year;
    segment = 'Cours magistral';
    slotTP = 'no';
    shownGroup = null;
    slotCM = 'no';
    displayedActi: Array<Activity> = [];
    courseSorted: { cm: Array<Activity>, tp: Array<Activity>, ex: Array<Activity> };
    noTP: boolean;
    noCM: boolean;
    noEx: boolean;


    constructor(
        public courseService: CourseService,
        private calendar: Calendar,
        public userS: UserService,
        public modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private translateService: TranslateService,
        private route: ActivatedRoute,
        private router: Router,
        private utilsServices: UtilsService,
        private alertService: AlertService
    ) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.sessionId = this.router.getCurrentNavigation().extras.state.sessionId;
                this.course = this.router.getCurrentNavigation().extras.state.course;
                this.year = this.router.getCurrentNavigation().extras.state.year;
                this.courseSorted = {cm: [], tp: [], ex: []};
                const acro = this.course.acronym;
                if (this.userS.hasSlot(acro, 'CM')) {
                    this.slotCM = this.userS.getSlot(acro, 'CM');
                }
                if (this.userS.hasSlot(acro, 'TP')) {
                    this.slotTP = this.userS.getSlot(acro, 'TP');
                }
            }
        });
    }

    toggleGroup(infos: string) {
        this.shownGroup = this.utilsServices.toggleGroup(infos, this.shownGroup);
    }

    /*Display the available sessions for a course*/
    ngOnInit() {
        this.getCourse(this.sessionId, this.course.acronym);
    }

    /*Get sessions of the course to display for the selectionned project and display them*/
    getCourse(sessionId: string, acronym: string) {
        this.courseService.getCourseId(sessionId, acronym).then(
            (data: any) => {
                this.courseService.getActivity(sessionId, data).then(
                    courseData => {
                        this.course.activities = courseData.sort(
                            (a1, a2) => a1.start.valueOf() - a2.start.valueOf()
                        ).filter(
                            activitie => activitie.end.valueOf() > Date.now().valueOf()
                        ); //  display only activities finished after now time
                        this.displayedActi = this.course.activities;
                        this.courseSorted.cm = this.course.activities.filter(acti => acti.type === 'Cours magistral');
                        this.courseSorted.tp = this.course.activities.filter(acti => (acti.type === 'TD' || acti.type === 'TP'));
                        this.courseSorted.ex = this.course.activities.filter(acti => acti.isExam);
                        this.updateDisplayed();
                    }
                );
            }
        );
    }

    /*Add an activity (a session of the course) to the calendar of the smartphone*/
    addToCalendar(slidingItem: IonItemSliding, activity: Activity) {
        let message = '';
        this.translateService.get('COURSE.MESSAGE').subscribe((res: string) => {
            message = res;
        });
        const datas = {
            title: this.course.name + ': ' + activity.type,
            location: activity.auditorium,
            start: activity.start,
            end: activity.end
        };
        this.utilsServices.createEventInCalendar(datas, message, slidingItem);
        this.alertService.alertCourse({'warning': 'COURSE.WARNING', 'message': 'COURSE.MESSAGE3'});
    }

    /*Filter TP if a slot is selectionned*/
    updateDisplayedTP() {
        const toFilter = this.courseSorted.tp;
        this.noTP = toFilter.length === 0;
        let toPush;
        if (this.slotTP !== 'no') {
            toPush = toFilter.filter(acti => (acti.name === this.slotTP || acti.name.indexOf('-') > -1));
        } else {
            toPush = this.courseSorted.tp;
        }
        this.displayedActi = this.displayedActi.concat(toPush);
    }

    /*Filter CM if a slot is selectionned*/
    updateDisplayedCM() {
        const toFilter = this.courseSorted.cm;
        this.noCM = toFilter.length === 0;
        let toPush: Array<Activity>;
        if (this.slotCM !== 'no') {
            toPush = toFilter.filter(acti => (acti.name === this.slotCM));
        } else {
            toPush = this.courseSorted.cm;
        }
        this.displayedActi = this.displayedActi.concat(toPush);
    }

    /*Update the display if a filter is applicated*/
    updateDisplayed() {
        this.displayedActi = [];
        this.updateDisplayedCM();
        this.updateDisplayedTP();
        this.displayedActi = this.displayedActi.concat(this.courseSorted.ex);
        this.noEx = this.courseSorted.ex.length === 0;
    }

    /*Display a prompt to proprose to the students the slots available for the TP or the CM*/
    async showPrompt(segment: string) {
        let title = '';
        let message = '';
        let cancel = '';
        let apply = '';
        this.translateService.get('COURSE.TITLE').subscribe((res: string) => {
            title = res;
        });
        this.translateService.get('COURSE.MESSAGE2').subscribe((res: string) => {
            message = res;
        });
        this.translateService.get('COURSE.CANCEL').subscribe((res: string) => {
            cancel = res;
        });
        this.translateService.get('COURSE.APPLY').subscribe((res: string) => {
            apply = res;
        });
        const options = this.getPromptOptions(title, message, cancel, apply, segment);
        const aucun = ((this.slotTP === 'no' && segment === 'TD') || (this.slotCM === 'no' && segment === 'Cours magistral'));
        const array = this.getSlots(segment);
        this.fillInputs(array, options, aucun);
        const prompt = await this.alertCtrl.create(options);
        if (options.inputs.length > 1) {
            return await prompt.present();
        }
    }

    /*Return the different slots available for a course TP or CM */
    getSlots(segment: string) {
        let act: Activity[] = this.course.activities;
        act = act.filter(
            acti => (acti.type === segment || (acti.type === 'TP' && segment === 'TD') || (segment === 'Examen' && acti.isExam))
        );
        // retrieve name of each slot
        let slots = act.map(item => item.name)
            .filter((value, index, self) => self.indexOf(value) === index); // keep only different
        // delete some session (like seance aide etude)
        if (segment === 'TD') {
            slots = slots.filter(acti => acti.indexOf('_') !== -1);
        }
        if (segment === 'Cours magistral') {
            slots = slots.filter(acti => acti.indexOf('-') !== -1);
        }
        const newAct: Activity[] = [];
        // retrieve one activity of each slot
        for (let i = 0; i < slots.length; i++) {
            const activity: Activity = act.find(acti => acti.name === slots[i]);
            newAct.push(activity);
        }
        return newAct;
    }

    /*Add a course to the calendar*/
    addCourseToCalendar() {
        const options: any = {
            firstReminderMinutes: 15
        };
        for (const activity of this.displayedActi) {
            this.calendar.createEventWithOptions(this.course.name + ': ' + activity.type,
                activity.auditorium, null, activity.start, activity.end, options);
        }
        let message = '';
        this.translateService.get('STUDY.MESSAGE3').subscribe((res: string) => {
            message = res;
        });
        this.alertService.presentToast(message);
        this.alertService.alertCourse({'warning': 'STUDY.WARNING', 'message': 'STUDY.MESSAGE4'});
    }

    async openModalInfo() {
        const myModal = await this.modalCtrl.create(
            {
                component: ModalInfoPage,
                componentProps: {course: this.course, year: this.year},
                cssClass: 'modal-fullscreen'
            });
        return await myModal.present();
    }

    private fillInputs(array: Activity[], options: any, aucun: boolean) {
        for (let i = 0; i < array.length; i++) {
            const slotChosen = (this.slotTP === array[i].name || this.slotCM === array[i].name);
            options.inputs.push(this.getInputsOption(array, i, slotChosen));
        }
        if (options.inputs.length > 1) {
            options.inputs.push({name: 'options', value: 'no', label: 'Toutes', type: 'radio', checked: aucun});
        }
    }

    private getInputsOption(array: Activity[], i: number, slotChosen: boolean): any {
        return {
            name: 'options',
            value: array[i].name,
            label: array[i].name + ' ' + array[i].start.getHours() + ':' + array[i].start.getUTCMinutes(),
            type: 'radio',
            checked: slotChosen
        };
    }

    private getPromptOptions(title: string, message: string, cancel: string, apply: string, segment: string) {
        return {
            title: title,
            message: message,
            inputs: [],
            buttons: [
                {
                    text: cancel,
                    handler: () => {
                    }
                },
                {
                    text: apply,
                    handler: data => {
                        this.addSlot(segment, data);
                        this.updateDisplayed();
                    }
                }
            ]
        };
    }

    private addSlot(segment: string, data: any) {
        const type = segment === 'Cours magistral' ? 'CM' : 'TP';
        if (type === 'TP') {
            this.slotTP = data;
        } else {
            this.slotCM = data;
        }
        this.userS.addSlot(this.course.acronym, data, type);
    }
}
