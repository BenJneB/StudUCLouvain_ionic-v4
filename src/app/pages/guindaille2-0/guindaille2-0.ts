/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Daubry Benjamin & Marchesini Bruno
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

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-guindaille2-0',
  templateUrl: 'guindaille2-0.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})

export class GuindaillePage {
  header: any;
  shownGroup = null;
  segment:string = 'pict';

  /*Create that to use the system of bilingual application, the objects are instantiate here
  One object for each pictogram*/

  alt:string;
  altsub:string;
  alterner = { header: '',
          subHeader: '',
          buttons: ['OK'] };

  brt:string;
  brtsub:string;
  bruit = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  wat:string;
  watsub:string;
  eau = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  where:string;
  wheresub:string;
  ou = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  can:string;
  cansub:string;
  cans = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  pres:string;
  pressub:string;
  preservatif = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  rac:string;
  racsub:string;
  racompagner = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  ur:string;
  ursub:string;
  uriner = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  de:string;
  desub:string;
  dehors = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  vio:string;
  viosub:string;
  violence = { header: '',
      subHeader: '',
      buttons: ['OK'] };

  /*Create that to use the system of bilingual application, the objects are instantiate here
  header and efct for each part of the effectometre*/
  ttl1:string;
  efct1:string;
  ttl2:string;
  efct2:string;
  ttl3:string;
  efct3:string;
  ttl4:string;
  efct4:string;
  ttl5:string;
  efct5:string;
  ttl6:string;
  efct6:string;

  /*Create that to use the system of bilingual application, the objects are instantiate here
  One object each part of the effectometre*/

  slides = [
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/1.png",
      },
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/2.png",
      },
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/3.png",
      },
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/4.png",
      },
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/5.png",
      },
      {
        header: '',
        subHeader: '',
        buttons: ['OK'],
        image: "assets/img/guindaille/6.png",
      }];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public translateService: TranslateService)
  {

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE1').subscribe((res:string) => {this.alt=res;});
      this.translateService.get('GUINDAILLE.PIC1').subscribe((res:string) => {this.altsub=res;});
      //put real value for each attributes
      this.alterner.header = this.alt;
      this.alterner.subHeader = this.altsub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE2').subscribe((res:string) => {this.brt=res;});
      this.translateService.get('GUINDAILLE.PIC2').subscribe((res:string) => {this.brtsub=res;});
      //put real value for each attributes
      this.bruit.header = this.brt;
      this.bruit.subHeader = this.brtsub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE3').subscribe((res:string) => {this.wat=res;});
      this.translateService.get('GUINDAILLE.PIC3').subscribe((res:string) => {this.watsub=res;});
      //put real value for each attributes
      this.eau.header = this.wat;
      this.eau.subHeader = this.watsub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE4').subscribe((res:string) => {this.where=res;});
      this.translateService.get('GUINDAILLE.PIC4').subscribe((res:string) => {this.wheresub=res;});
      //put real value for each attributes
      this.ou.header = this.where;
      this.ou.subHeader = this.wheresub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE5').subscribe((res:string) => {this.can=res;});
      this.translateService.get('GUINDAILLE.PIC5').subscribe((res:string) => {this.cansub=res;});
      //put real value for each attributes
      this.cans.header = this.can;
      this.cans.subHeader = this.cansub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE6').subscribe((res:string) => {this.pres=res;});
      this.translateService.get('GUINDAILLE.PIC6').subscribe((res:string) => {this.pressub=res;});
      //put real value for each attributes
      this.preservatif.header = this.pres;
      this.preservatif.subHeader = this.pressub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE7').subscribe((res:string) => {this.rac=res;});
      this.translateService.get('GUINDAILLE.PIC7').subscribe((res:string) => {this.racsub=res;});
      //put real value for each attributes
      this.racompagner.header = this.rac;
      this.racompagner.subHeader = this.racsub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE8').subscribe((res:string) => {this.ur=res;});
      this.translateService.get('GUINDAILLE.PIC8').subscribe((res:string) => {this.ursub=res;});
      //put real value for each attributes
      this.uriner.header = this.ur;
      this.uriner.subHeader = this.ursub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE9').subscribe((res:string) => {this.de=res;});
      this.translateService.get('GUINDAILLE.PIC9').subscribe((res:string) => {this.desub=res;});
      //put real value for each attributes
      this.dehors.header = this.de;
      this.dehors.subHeader = this.desub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLE10').subscribe((res:string) => {this.vio=res;});
      this.translateService.get('GUINDAILLE.PIC10').subscribe((res:string) => {this.viosub=res;});
      //put real value for each attributes
      this.violence.header = this.vio;
      this.violence.subHeader = this.viosub;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF1').subscribe((res:string) => {this.ttl1=res;});
      this.translateService.get('GUINDAILLE.EFFECT1').subscribe((res:string) => {this.efct1=res;});
      //put real value for each attributes
      this.slides[0].header = this.ttl1;
      this.slides[0].subHeader = this.efct1;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF2').subscribe((res:string) => {this.ttl2=res;});
      this.translateService.get('GUINDAILLE.EFFECT2').subscribe((res:string) => {this.efct2=res;});
      //put real value for each attributes
      this.slides[1].header = this.ttl2;
      this.slides[1].subHeader = this.efct2;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF3').subscribe((res:string) => {this.ttl3=res;});
      this.translateService.get('GUINDAILLE.EFFECT3').subscribe((res:string) => {this.efct3=res;});
      //put real value for each attributes
      this.slides[2].header = this.ttl3;
      this.slides[2].subHeader = this.efct3;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF4').subscribe((res:string) => {this.ttl4=res;});
      this.translateService.get('GUINDAILLE.EFFECT4').subscribe((res:string) => {this.efct4=res;});
      //put real value for each attributes
      this.slides[3].header = this.ttl4;
      this.slides[3].subHeader = this.efct4;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF5').subscribe((res:string) => {this.ttl5=res;});
      this.translateService.get('GUINDAILLE.EFFECT5').subscribe((res:string) => {this.efct5=res;});
      //put real value for each attributes
      this.slides[4].header = this.ttl5;
      this.slides[4].subHeader = this.efct5;

      //get the good value
      this.translateService.get('GUINDAILLE.TITLEF6').subscribe((res:string) => {this.ttl6=res;});
      this.translateService.get('GUINDAILLE.EFFECT6').subscribe((res:string) => {this.efct6=res;});
      //put real value for each attributes
      this.slides[5].header = this.ttl6;
      this.slides[5].subHeader = this.efct6;
  }

  /*Display alert*/
  showAlert(page) {
    console.log(page);
      let alert = this.alertCtrl.create(page).then(alert => alert.present());
  }
}
