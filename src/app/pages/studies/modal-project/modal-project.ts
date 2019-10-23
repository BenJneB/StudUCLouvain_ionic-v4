/**
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors: Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date: 2018-2019
    This file is part of Stud.UCLouvain
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    Stud.UCLouvain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.s

    Stud.UCLouvain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AdeProject } from '../../../entity/adeProject';
import { StudiesService } from '../../../services/studies-services/studies-service';

@Component({
  selector: 'page-modal-project',
  templateUrl: 'modal-project.html',
  styleUrls: ['./modal-project.scss'],
})
export class ModalProjectPage implements OnInit {
  sessionId: string;
  public projects;

  constructor(
    public storage: Storage,
    public navParams: NavParams,
    public viewCtrl: ModalController,
    public studiesService: StudiesService
  ) {
    this.sessionId = this.navParams.get('sessionId');
  }

  /*Set the project and close de view of the modal*/
  closeModal(project: AdeProject) {
    this.studiesService.setProject(this.sessionId, project.id).then(
      () => {
        this.storage.set('adeProject', project);
        this.viewCtrl.dismiss(project);
      }
    );
  }

  /*Get the available projects*/
  getProjects(sessionId: string) {
    this.studiesService.getProjects(sessionId).then(
      data => {
        this.projects = data;
      });
  }

  ngOnInit() {
    this.getProjects(this.sessionId);
  }
}
