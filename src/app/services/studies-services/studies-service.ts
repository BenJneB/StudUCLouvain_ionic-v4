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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AdeService } from './ade-service';
import { AdeProject } from '../../entity/adeProject';


@Injectable({ 
  providedIn: 'root' 
})
export class StudiesService {
  url: string;
  projects: AdeProject[];
  data: any;
  constructor(
    public http: HttpClient,
    public ade: AdeService) {}

  /*Open session for the user*/
  openSession() {
    return new Promise<string>( (resolve, reject) => {
      console.log('StudiesService openSession')
      this.ade.httpOpenSession().subscribe(
        data => {
          resolve( data['session'].$.id);
        }
      );
    });
  }

  /*Get the projects ADE*/
  getProjects(sessionId: string) {
    return new Promise( (resolve, reject) => {
      console.log('Studiesservice getProjects')
      this.ade.httpGetProjects(sessionId).subscribe(
        data => {
          resolve(this.extractAdeProjects(data));
          }
        );
      });
  }

  /*Extract the projects ADE*/
  extractAdeProjects(data): AdeProject[] {
    const projects: AdeProject[] = [];
    console.log(data.projects)
    console.log(data.projects.project.length)
    if (data.projects.project.length === undefined) {
      let name = data.projects.project.$.name.toString();
      console.log('name: ' + name);
      let id = data.projects.project.$.id.toString();
      console.log('id: ' + id);
      let project = new AdeProject(id, name);
      console.log('project' + project)
      console.log('projects' + projects)
      projects.push(project)
    } else {
      for(let i=0 ; i<data.projects.project.length ; i++) {
        let name = data.projects.project[i].$.name.toString();
        console.log('name: ' + name);
        let id = data.projects.project[i].$.id.toString();
        console.log('id: ' + id);
        let project = new AdeProject(id, name);
        console.log('project' + project)
        console.log('projects' + projects)
        projects.push(project)
      }
    }
    console.log('extractAdeProjects return projects ');
    console.log(projects);
    return projects;
  }

  /*Set the project selected by the user*/
  setProject(sessionId: string, projectId: string) {
    return new Promise( (resolve, reject) => {
      console.log('studiesService setProject:' + sessionId + ' projectId: ' +  projectId);
      this.ade.httpSetProject(sessionId, projectId).subscribe(
        data => { resolve(data);       }
      );
    });
  }

}
