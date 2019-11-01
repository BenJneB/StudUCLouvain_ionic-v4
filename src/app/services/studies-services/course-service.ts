import { Observable } from 'rxjs/internal/Observable';

import { HttpClient } from '@angular/common/http';
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
import { Injectable } from '@angular/core';

import { Activity } from 'src/app/models/activity';
import { AdeService } from './ade-service';

@Injectable()
export class CourseService {

    constructor(
        public http: HttpClient,
        public ade: AdeService) {
    }

    /*Get the course ID for the acronym of the course*/
    getCourseId(sessionId: string, acronym: string) {
        return this.getData(this.extractCourseId, this.ade.getCourseId.bind(this.ade), sessionId, acronym);
    }

    getData(extract: (data: any) => any, getInfo: (sessionId: string, field: string) => Observable<any>, sessionId: string, field: string) {
        return new Promise<Activity[]>((resolve) => {
            getInfo(sessionId, field).subscribe(
                data => {
                    resolve(extract(data));
                });
        });
    }

    /*Extract the course ID*/
    extractCourseId(data) {
        if (data.resources.resource !== undefined) {
            return data.resources.resource.$.id;
        }
    }

    /*Get activity for a course ID obtained by getting this from a course selected by the user*/
    getActivity(sessionId: string, courseId: any) {
        return this.getData(this.extractActivity.bind(this), this.ade.getActivity.bind(this.ade), sessionId, courseId);
    }

    /*Extract the activity*/
    extractActivity(data): Activity[] {
        let activities: Activity[] = [];
        if (data.activities !== undefined) {
            let activitiesList = data.activities.activity;
            if (activitiesList.length === undefined) {
                activitiesList = [];
                activitiesList.push(data.activities.activity);
            }
            for (let i = 0; i < activitiesList.length; i++) {
                const activityElem = activitiesList[i];
                const newActivities: Activity[] = this.createNewActivities(activityElem);
                activities = activities.concat(newActivities);
            }
        }
        return activities;
    }

    /*For each activity collect the right variables to be able to display them*/
    createNewActivities(jsonActivity): Activity[] {
        const activities: Activity[] = [];
        const type = jsonActivity.$.type;
        const isExam = type.indexOf('Examen') !== -1;
        let events = jsonActivity.events.event;
        if (events !== undefined) {
            events = this.handleSpecialCase(events);
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const endHour = event.$.endHour;
                const startHour = event.$.startHour;
                const date = event.$.date;
                const participants = event.eventParticipants.eventParticipant;
                const {teachers, students, auditorium} = this.getItems(participants);
                const start = this.createDate(date, startHour);
                const end = this.createDate(date, endHour);
                const name = event.$.name;
                const activity = new Activity(type, teachers, students, start, end, auditorium, isExam, name);
                activities.push(activity);
            }
        }
        return activities;
    }

    /*Create a date*/
    createDate(date: string, hour: string): Date {
        const splitDate = date.split('/');
        const splitHour = hour.split(':');
        return new Date(
            parseInt(splitDate[2], 10),
            parseInt(splitDate[1], 10) - 1,
            parseInt(splitDate[0], 10),
            parseInt(splitHour[0], 10),
            parseInt(splitHour[1], 10)
        );
    }

    getItems(participants) {
        let itemsData = {students: '&nbsp;&nbsp;&nbsp;&nbsp;', teachers: '', auditorium: ''};
        for (let i = 0; i < participants.length; i++) {
            itemsData = this.fillItems(participants, i, itemsData);
        }
        itemsData.students = itemsData.students.substr(0, itemsData.students.length - 28);
        return itemsData;
    }

    private handleSpecialCase(events: any) {
        if (events.length === undefined) {
            const temp = events;
            events = [];
            events.push(temp);
        }
        return events;
    }

    private fillItems(participants: any, i: number, itemsData: any) {
        switch (participants[i].$.category) {
            case 'trainee': {
                itemsData.students = itemsData.students + participants[i].$.name + '<br>&nbsp;&nbsp;&nbsp;&nbsp;';
                break;
            }
            case 'classroom': {
                itemsData.auditorium = itemsData.auditorium + participants[i].$.name + ' ';
                break;
            }
            case 'instructor': {
                itemsData.teachers = itemsData.teachers + participants[i].$.name + '/';
                break;
            }
        }
        return itemsData;
    }
}
