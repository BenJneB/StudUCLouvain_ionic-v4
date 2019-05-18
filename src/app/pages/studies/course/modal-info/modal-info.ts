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
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';

import { StudentService } from '../../../../services/wso2-services/student-service';

@Component({
  selector: 'page-modal-info',
  templateUrl: 'modal-info.html',
})
export class ModalInfoPage {
  course = this.navParams.get('course');
  year = this.navParams.get('year');
  information: any;
  langue;


  constructor(public navCtrl: NavController,

    public navParams: NavParams,
    public viewCtrl: ModalController,
    public studentService: StudentService) {
    this.getInfo().then(data => {
      this.information = data;
      this.langue = data.langue;
    });
  }

  getInfo(): Promise<any> {
    let response: any;
    return new Promise(resolve => {
      this.studentService.checkCourse(this.course.acronym, this.year).then(
        (data) => {
          console.log(data);
          const res: any = data;
          console.log(res);
          if (data === 400) {

            this.closeModal();
            resolve(400);
          } else {
            let cahier = '';
            const { offres, campus, entite, teacher, loca, credit, progpre, quadri, resume, vol, langue } = this.getDatas(res);
            if (res.cahierChargesExiste) {
              cahier = res.cahierChargesMap.entry[1].value;
            }
            response = {
              cahierCharges: cahier,
              offre: offres,
              campus: campus,
              entite: entite,
              prof: teacher,
              localisation: loca,
              credit: credit,
              programmeprerequis: progpre,
              quadri: quadri,
              resume: resume,
              volume: vol,
              langue: langue
            };
            resolve(response);
          }
        });
    });
  }

  private getDatas(res: any) {
    const campus = res.campus;
    const teacher = res.fichesIntervenants;
    const offres = res.fichesOffres;
    const langue = res.langueEnseignement;
    const loca = res.localisation;
    const credit = res.ects;
    const entite = res.entiteCharge;
    const progpre = res.programmesEtPrerequis;
    const quadri = res.quadrimestre;
    const resume = res.resumeCoursMap.entry[1].value;
    const vol = { 'vol1': res.volTot1, 'vol2': res.volTot2, 'vol1Coef': res.volTot1AvecCoef, 'vol2Coef': res.volTot2AvecCoef };
    return { offres, campus, entite, teacher, loca, credit, progpre, quadri, resume, vol, langue };
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
