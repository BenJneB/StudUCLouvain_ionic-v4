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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-guindaille2-0',
  templateUrl: 'guindaille2-0.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0' })),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})

export class GuindaillePage {
  header: any;
  shownGroup = null;
  segment = 'pict';
  numbersSlides = Array.from({ length: (6) }, (v, k) => k);
  numberPictos = Array.from({ length: (10) }, (v, k) => k);
  slides = [];
  pictos = [];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public translateService: TranslateService) {
    this.numbersSlides.map((numSlide) => {
      const title = 'GUINDAILLE.TITLEF' + (numSlide + 1);
      const subTitle = 'GUINDAILLE.EFFECT' + (numSlide + 1);
      this.translateService.get([title, subTitle]).subscribe((res: string) => {
        this.slides[numSlide] = {
          header: res[title],
          subHeader: res[subTitle],
          buttons: ['OK'],
          image: 'assets/img/guindaille/' + (numSlide + 1) + '.png',
        };
      });
    });
    const pictoListImg = [
      'alterner', 'Bruit-exterieur', 'eau-gratuite',
      'jen-suis-ou', 'no-cans-no-glass', 'preservatif-jy-pense',
      'racompagner', 'uriner-dans-le-pot', 'uriner-dehors',
      'Violence-arrete-toi-avant'
    ];
    this.numberPictos.map((numPicto) => {
      const title = 'GUINDAILLE.TITLE' + (numPicto + 1);
      const subTitle = 'GUINDAILLE.PIC' + (numPicto + 1);
      this.translateService.get([title, subTitle]).subscribe((res: string) => {
        this.pictos[numPicto] = {
          header: res[title],
          subHeader: res[subTitle],
          buttons: ['OK'],
          image: 'assets/img/guindaille/' + pictoListImg[numPicto] + '.png'
        };
      });
    });
  }

  async showAlert(page) {
    const alert = await this.alertCtrl.create(page);
    await alert.present();
  }
}
