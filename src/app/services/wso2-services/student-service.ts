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

import { Wso2Service } from './wso2-service';

@Injectable()
export class StudentService {
  activities: Array<String> = [];
  url = 'my/v0/student/';
  options: any;
  courseUrl = 'learning/v1/learningUnits/';

  constructor(public http: HttpClient, private wso2Service: Wso2Service) {
  }

  public searchActivities() {
    this.activities = [];
    let newUrl = this.url;
    newUrl += 'activities';
    return new Promise(resolve => {
      this.wso2Service.loadStudent(newUrl).subscribe(
        data => {
          if (data['activities'] !== null) {
            resolve({ activities: data['activities'] });
          }
        });
    });
  }

  public checkCourse(sigle: string, year) {
    const newUrl = this.courseUrl + year + '/' + sigle + '/fullInformation';
    return new Promise(resolve => {
      this.wso2Service.load(newUrl).subscribe(
        (data) => {
          let res: any;
          res = data;
          resolve(res.ficheActivite);
        },
        (err) => {
          console.log(err);
          resolve(err.status);
        });
    });
  }

  public weekSchedule() {
    const newUrl = this.url + 'courseSchedules?date= ';
    let C = 7 - new Date().getDay();
    if (C === 7) { C = C - 1; }
    const schedule: Array<any> = [];
    return new Promise(resolve => {
      for (let _i = 0; _i < C; _i++) {
        const date = this.getDate(_i);
        const day = this.getDay(_i);
        this.getSchedule(newUrl, date, schedule, day);
      }
      resolve(schedule);
    });
  }

  private extractSchedule(res: any, date: string) {
    const items = res.items.item;
    let dayDate = date.substr(5);
    dayDate = dayDate.substr(3) + '/' + dayDate.substr(0, 2);
    for (const cours of items) {
      let name: any;
      this.checkCourse(cours.cours, new Date().getFullYear()).then((data: any) => {
        name = data.intituleCompletMap.entry[1].value;
        cours['name'] = name;
      });
    }
    return { dayDate, items, res };
  }

  public todaySchedule() {
    const newUrl = this.url + 'courseSchedules?date= ';

    const schedule: Array<any> = [];
    return new Promise(resolve => {
      const date = this.getDate(0);
      this.getSchedule(newUrl, date, schedule);
      resolve(schedule);
    });
  }

  private getSchedule(newUrl: string, date: string, schedule: any[], day?: string) {
    const url = newUrl + date;
    this.wso2Service.loadStudent(url).subscribe(data => {
      let res: any;
      res = data;
      if (res.items !== null) {
        let dayDate;
        let items;
        ({ dayDate, items, res } = this.extractSchedule(res, date));
        const daySchedule: { date: string, schedule, day?: string } = { date: dayDate, schedule: items };
        if (day !== undefined) {
          daySchedule.day = day;
        }
        schedule.push(daySchedule);
        schedule.sort((a, b) => parseInt(a.date.substr(0, 2), 10) - parseInt(b.date.substr(0, 2), 10));
      }
    });
  }

  getDay(i: number): string {
    const dayList = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayList[i];
  }

  getDate(i: number): string {
    const today = new Date();
    today.setDate(today.getDate() + i);
    let day = today.getDate().toString();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    const year = today.getFullYear();
    return year + '-' + month + '-' + day;
  }

  getStatus() {
    const newUrl = this.url + 'inscriptions';
    return new Promise(resolve => {
      this.wso2Service.loadStudent(newUrl).subscribe(
        (data) => {
          let res: any;
          res = data;
          resolve(res.lireInscriptionAnacResponse.return);
        },
        (err) => {
          console.log(err);
          resolve(err.status);
        });
    });
  }
}
