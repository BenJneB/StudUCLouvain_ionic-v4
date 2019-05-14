/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Benjamin Daubry & Bruno Marchesini
    Date : 2018-2019
    This file is part of StudUCLouvain
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

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TutoPage } from './tuto';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TutoPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TutoPage
      }
    ])
  ],
})
export class TutoPageModule {}
