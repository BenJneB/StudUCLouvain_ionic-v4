
import {map} from 'rxjs/operators';
/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors : Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date : 2018-2019
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
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { UtilsService } from '../utils-services/utils-services';



// import X2JS from 'x2js';
/*
  Generated class for the AdeserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable({
  providedIn: 'root'
})
export class AdeService {
  AdeserviceBaseUrl = 'http://horaire.uclouvain.be/jsp/webapi?';
  AdeserviceConnection = 'function=connect&login=etudiant&password=student';
  AdeServiceGetProjects = '&function=getProjects&detail=2';

  constructor(public http: HttpClient, private utilsServices: UtilsService) {
  }

  /*Open a session*/
  httpOpenSession() {
    const encodedURL: string = this.AdeserviceBaseUrl + this.AdeserviceConnection;
    return this.getDataFromADE(encodedURL);
  }

  private getDataFromADE(encodedURL: string) {
    return this.http.get(encodedURL, { responseType: 'text' }).pipe(map(res => {
      return this.utilsServices.convertToJson(res);
    }, err => {
    }));
  }

  getBasicSessionUrl(sessionId: string) {
    return this.AdeserviceBaseUrl + 'sessionId=' + sessionId
  }
  /*Get the projects from ADE*/
  httpGetProjects(sessionId: string){
    const encodedURL: string = this.getBasicSessionUrl(sessionId) + this.AdeServiceGetProjects;
    return this.getDataFromADE(encodedURL);
  }

  /*Set the project selected by the user*/
  httpSetProject(sessionId: string, projectId: string) {
    const encodedURL: string = this.getBasicSessionUrl(sessionId) + '&function=setProject&projectId=' + projectId;
    return this.getDataFromADE(encodedURL);
  }

  /*For a course selected and its acronym get the course id*/
  httpGetCourseId(sessionId: string, acronym: string) {
    const encodedURL: string = this.getBasicSessionUrl(sessionId) + '&function=getResources&code=' + acronym;
    return this.getDataFromADE(encodedURL);
  }

  /*For a course selected get the activities*/
  httpGetActivity(sessionId: string , courseId: string) {
    const encodedURL: string = this.getBasicSessionUrl(sessionId) + '&function=getActivities&resources=' + courseId + '&detail=17';
    return this.getDataFromADE(encodedURL);
  }

}
