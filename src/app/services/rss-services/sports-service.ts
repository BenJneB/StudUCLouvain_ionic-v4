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

import { UserService } from '../utils-services/user-service';
import { RssService } from './rss-service';
import { SportItem } from '../../entity/sportItem';

@Injectable({ 
  providedIn: 'root' 
})
export class SportsService {
  sports: Array<SportItem> = [];
  teams: Array<SportItem> = [];
  allCategories: any = [];
  allCategoriesT: any = [];
  shownSports = 0;
  shownTeams = 0;

  url = ''; // students
  urlT = ''; // equipe universitaire

  constructor(public user:UserService, public rssService: RssService) {

  }

  /*Get the good URL in function of the user's campus*/
  update() {
   // reset url
    this.url = 'https://uclsport.uclouvain.be/smartrss.php?-public=etu&-startdate= ';
    this.urlT = 'https://uclsport.uclouvain.be/smartrss.php?-public=equip&-startdate= '

   //  first day of the week: today
    const { todayString, endString } = this.getSportsDates(dateToString);

   // which campus ?
    const site: string = this.getSportCampus();

   // final URL
    let restUrl = todayString + '&-enddate= ' + endString + '&-site= ' ;
    let urlTemp = this.url + restUrl + site;
    let urlTempT = this.urlT + restUrl + 'louv';
    this.url = urlTemp;
    this.urlT = urlTempT;

    function dateToString(date) {
      return date.toISOString().split('T')[0];
    }
  }

  private getSportsDates(dateToString: (date: any) => any) {
    let today: Date = new Date();
    // last day of the week: today +6
    let end: Date = new Date();
    end.setDate(today.getDate() + 6);
    // invert date
    let todayString = dateToString(today);
    let endString = dateToString(end);
    return { todayString, endString };
  }

  private getSportCampus() {
    let site: string;
    let campus = this.user.campus;
    if (campus === 'LLN') {
      site = 'louv';
    }
    if (campus === 'Woluwe') {
      site = 'wol';
    }
    if (campus === 'Mons') {
      site = 'mons';
    }
    return site;
  }

  private getSportsDatas(segment: string) {
    this.update();
    const isSport = segment === 'all';
    isSport ? this.sports = [] : this.teams = [];
    return {
      sports: isSport ? this.sports : this.teams,
      shownSports: isSport ? this.shownSports : this.shownTeams,
      url: isSport ? this.url : this.urlT,
      categories: isSport ? this.allCategories : this.allCategoriesT
    }
  }

  /*Get sports for the URL specific to the campus of the user*/
  public getSports(segment: string) {
    const datas = this.getSportsDatas(segment);
    return this.rssService.load(datas['url'], true).then(result => {
      this.extractSports(result, segment === 'team' ? false : true);
      return {
        sports: datas['sports'],
        shownSports: datas['shownSports'],
        categories: datas['categories']
      }
    }) .catch(error => {
      if (error === 1) {
        return this.getSports(segment);
      } else {
        if (error === 2) {
          console.log('Loading sports: GET req timed out > limit, suppose no sports to be displayed');
        } else {
          console.log('Error loading sports: ' + error);
        }
        return {
          sports: [],
          shownSports: 0,
          categories: []
        }
      }
    });
  }

  /*Extract sports with all the details*/
  private extractSports(data: any, isSport: boolean = true) {
    if (data === undefined) {
      console.log('Error sports data undefined!!!')
      return;
    }
    if (data.length === undefined) {
      let temp = data;
      data = [];
      data.push(temp);
    }
    this.shownSports = 0;
    this.shownTeams = 0;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let favorite = false;
      let hidden = false;

      if (this.user.hasFavorite(item.guid)) {
        favorite = true;
      }
      if (item.activite) {
        if (isSport) {
          this.getCategories(this.allCategories, item);
        } else {
          this.getCategories(this.allCategoriesT, item);
        }
      }
      if (isSport) {
        this.shownSports++;
      } else {
        this.shownTeams++;
      }
      let startDate = this.createDateForSport(item.date, item.hdebut);
      let endDate = this.createDateForSport(item.date, item.hfin);
      let newSportItem = new SportItem(item.activite, item.genre, item.lieu, item.salle, item.jour, startDate,
                      hidden, favorite, endDate, item.type, item.online, item.remarque, item.active, item.activite.concat(item.date.toString()));


      if (isSport) {
        this.sports.push(newSportItem);
      } else {
        this.teams.push(newSportItem);
      }
    }
  }

  private getCategories(categories: any, item: any) {
    if (categories.indexOf(item.activite) < 0) {
      categories.push(item.activite);
    }
    categories.sort();
  }

  /*Return a date in good form by splitting for the sport*/
  private createDateForSport(str: string, hour: string):Date {
      let timeSplit = hour.split(':');
      let dateSplit = str.split('/');
      let year = parseInt(dateSplit[2]);
      let month = parseInt(dateSplit[1])-1;
      let day = parseInt(dateSplit[0]);
      let hours = parseInt(timeSplit[0]);
      let minutes = parseInt(timeSplit[1]);
      return new Date(year, month, day, hours, minutes);
  }
}
