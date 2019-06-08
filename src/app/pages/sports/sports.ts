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
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Calendar } from '@ionic-native/calendar/ngx';
import { IonItemSliding, IonList, ModalController, NavController } from '@ionic/angular';

import { SportItem } from '../../entity/sportItem';
import { SportsService } from '../../services/rss-services/sports-service';
import { AlertService } from '../../services/utils-services/alert-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { LoaderService } from '../../services/utils-services/loader-service';
import { UserService } from '../../services/utils-services/user-service';
import { UtilsService } from '../../services/utils-services/utils-services';
import { SportsFilterPage } from './sports-filter/sports-filter';

@Component({
  selector: 'page-sports',
  templateUrl: 'sports.html'
})

export class SportsPage {
  @ViewChild('sportsList', { read: IonList }) sportsList: IonList;

  sports: Array<SportItem> = [];
  teams: Array<SportItem> = [];
  searching: any = false;
  segment = 'all';
  shownSports = 0;
  shownTeams = 0;
  searchTerm = '';
  searchControl: FormControl;
  filters: any = [];
  filtersT: any = [];
  excludedFilters: any = [];
  excludedFiltersT: any = [];
  displayedSports: Array<SportItem> = [];
  displayedSportsD: any = [];
  dateRange: any = 7;
  dateLimit: Date = new Date();
  campus: string;
  shownGroup = null;
  nosport: any = false;
  noteams: any = false;
  texts = {
    'FAV': 'SPORTS.MESSAGEFAV',
    'FAV2': 'SPORTS.FAVADD',
    'FAV3': 'SPORTS.MESSAGEFAV2',
    'CANCEL': 'SPORTS.CANCEL',
    'DEL': 'DELETE',
  };

  constructor(
    private alertService: AlertService,
    public modalCtrl: ModalController,
    private sportsService: SportsService,
    public user: UserService,
    private calendar: Calendar,
    public connService: ConnectivityService,
    private loader: LoaderService,
    public navCtrl: NavController,
    private utilsServices: UtilsService) {
    this.searchControl = new FormControl();
  }

  /*update the date with in real time value, load sport and display them*/
  ngOnInit() {
    this.updateDateLimit();
    if (this.connService.isOnline()) {
      this.loadSports(this.segment);
      this.loadSports('team');
      this.utilsServices.updateSearchControl(this.searchControl, this.searching, this.updateDisplayed.bind(this));
      this.loader.present('Please wait..').then();
    } else {
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  public doRefresh(refresher) {
    this.loadSports(this.segment);
    refresher.target.complete();
  }

  public onSearchInput() {
    this.searching = true;
  }

  toggleGroup(day: string) {
    this.shownGroup = this.utilsServices.toggleGroup(day, this.shownGroup);
  }

  public loadSports(segment: string) {
    this.searching = true;
    this.sportsList.closeSlidingItems();
    this.campus = this.user.campus;
    if (this.connService.isOnline()) {
      this.sportsService.getSports(segment).then(
        result => {
          this.assignDatas(
            segment === 'team' ? true : false,
            result
          );
        });
    } else {
      this.searching = false;
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  private assignDatas(isTeam: boolean, result: any) {
    isTeam ? this.teams = result.sports : this.sports = result.sports;
    isTeam ? this.shownTeams = result.shownSports : this.shownSports = result.shownSports;
    isTeam ? this.filtersT = result.categories : this.filters = result.categories;
    isTeam ? this.noteams = result.sports.length === 0 : this.nosport = result.sports.length === 0;
    this.searching = false;
    this.updateDisplayed();
  }

  /*Sort sports BY DAY*/
  public changeArray(array) {
    const groups = array.reduce(function (obj, item) {
      obj[item.jour] = obj[item.jour] || [];
      obj[item.jour].push(item);
      return obj;
    }, {});
    return this.utilsServices.getItemDisplay(groups);
  }

  /*Display the good list of sports according to the tab*/
  public updateDisplayed() {
    this.searching = true;
    this.sportsList.closeSlidingItems();
    const callFilter = this.isNotFavorite();
    if (callFilter === true) {// List of sports for all students
      const sport = this.segment === 'all' ? this.sports : this.teams;
      this.displayedSports = this.filterDisplayedSports(sport, this.excludedFilters);
    } else if (this.segment === 'favorites') {// list of sports put in favorite
      this.displayedSports = this.utilsServices.filterFavoriteItems(this.sports, this.searchTerm, 'sports');
    }
    this.shownSports = this.displayedSports.length;
    this.searching = false;
    this.displayedSportsD = this.changeArray(this.displayedSports);
    this.loader.dismiss();
  }

  private isNotFavorite() {
    return this.segment === 'all' || this.segment === 'team';
  }

  private filterDisplayedSports(items: Array<SportItem>, excluded: any) {
    return this.utilsServices.filterItems('sports', items, excluded, this.dateLimit, this.searchTerm);
  }

  private getFiltersData(isTeam: boolean) {
    if (isTeam === true) {
      return {
        filters: this.filtersT,
        exclude: this.excludedFiltersT
      };
    } else {
      return {
        filters: this.filters,
        exclude: this.excludedFilters
      };
    }
  }
  /*Display a modal to select as filter only the sports that the user want to see*/
  async presentFilter() {
    const datas = this.getFiltersData(this.segment === 'team');
    let filters = datas['filters'];
    const excluded = datas['exclude'];
    if (filters === undefined) {
      filters = [];
    }
    const modal = await this.modalCtrl.create({
      component: SportsFilterPage,
      componentProps: { excludedFilters: excluded, filters: filters, dateRange: this.dateRange }
    });
    await modal.present();
    await modal.onDidDismiss().then((data) => {
      if (data) {
        data = data.data;
        const tmpRange = data[1];
        if (tmpRange !== this.dateRange) {
          this.dateRange = tmpRange;
          this.updateDateLimit();
        }
        const newExclude = data[0];
        if (this.segment === 'all') { this.excludedFilters = newExclude; }
        if (this.segment === 'team') { this.excludedFiltersT = newExclude; }
        this.updateDisplayed();
      }
    });
  }

  /*Update the dateLimit when that is changed by the filter*/
  private updateDateLimit() {
    const today = new Date();
    this.dateLimit = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate() + this.dateRange);
  }

  /*Add a sport to calendar of the smartphone*/
  addToCalendar(slidingItem: IonItemSliding, itemData: SportItem) {
    const options: any = {
      firstReminderMinutes: 30
    };
    this.calendar.createEventWithOptions(itemData.sport, itemData.lieu,
      itemData.salle, itemData.date, itemData.hfin, options).then(() => {
        this.alertService.presentToast('Sport créé', slidingItem);
      });
  }

  /*Add a sport to favorite, each slot for the day selected*/
  addFavorite(slidingItem: IonItemSliding, itemData: SportItem) {
    this.utilsServices.addFavorite(itemData, this.texts, slidingItem, this.updateDisplayed.bind(this));
  }

  /*Remove a sport of the favorites*/
  removeFavorite(slidingItem: IonItemSliding, itemData: SportItem, title: string) {
    this.utilsServices.removeFavorite(slidingItem, itemData, title, this.texts, this.updateDisplayed.bind(this));
  }
}
