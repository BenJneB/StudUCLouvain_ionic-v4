import { map } from 'rxjs/operators';

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

import { UtilsService } from '../utils-services/utils-services';

// import X2JS from 'x2js';
/**
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

    constructor(public http: HttpClient, public utilsServices: UtilsService) {
    }

    /*Open a session*/
    httpOpenSession() {
        const encodedURL = this.AdeserviceBaseUrl + this.AdeserviceConnection;
        return this.getOrSetDataFromADE(encodedURL);
    }

    getOrSetDataFromADE(encodedURL: string, sessionId?: string) {
        if (sessionId !== undefined) {
            encodedURL = this.getBasicSessionUrl(sessionId) + encodedURL;
        }
        return this.http.get(encodedURL, {responseType: 'text'}).pipe(map(res => {
            return this.utilsServices.convertToJson(res);
        }, err => {
            console.log(err);
        }));
    }

    getBasicSessionUrl(sessionId: string) {
        return this.AdeserviceBaseUrl + 'sessionId=' + sessionId;
    }

    /*Get the projects from ADE*/
    getProjects(sessionId: string) {
        return this.getOrSetDataFromADE(this.AdeServiceGetProjects, sessionId);
    }

    /*Set the project selected by the user*/
    setProject(sessionId: string, projectId: string) {
        return this.getOrSetDataFromADE('&function=setProject&projectId=' + projectId, sessionId);
    }

    /*For a course selected and its acronym get the course id*/
    getCourseId(sessionId: string, acronym: string) {
        return this.getOrSetDataFromADE('&function=getResources&code=' + acronym, sessionId);
    }

    /*For a course selected get the activities*/
    getActivity(sessionId: string, courseId: string) {
        return this.getOrSetDataFromADE('&function=getActivities&resources=' + courseId + '&detail=17', sessionId);
    }
}
