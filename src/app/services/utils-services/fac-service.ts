
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


@Injectable({ 
  providedIn: 'root' 
})
export class FacService {
  facultes : any = [];
  url = 'assets/data/fac.json';
  constructor(public http: HttpClient)
  {

  }

  /*Load fac from Json file in assets*/
  public loadResources() {
    if(this.facultes.length == 0) return new Promise(resolve => {
      this.http.get(this.url).pipe(map(res => res)).subscribe(data => {
          for(let sector of data['secteurs']){
            this.facultes.push(sector);
          }
        resolve(this.facultes);
      });

    });
      else return new Promise(resolve => {
        resolve(this.facultes);
      });
  }

}
