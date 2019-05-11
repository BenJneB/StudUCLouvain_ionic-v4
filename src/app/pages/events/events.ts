import { UtilsService } from './../../services/utils-services/utils-services';
/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Jérôme Lemaire, Corentin Lamy, Daubry Benjamin & Marchesini Bruno
    Date : July 2018
    This file is part of UCLCampus
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    UCLCampus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    UCLCampus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with UCLCampus.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Component, ViewChild } from '@angular/core';
import { AlertController, IonItemSliding, IonList, NavController,
  ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { CacheService } from 'ionic-cache';
import { LoaderService } from '../../services/utils-services/loader-service';

import { UserService } from '../../services/utils-services/user-service';
import { EventsService } from '../../services/rss-services/events-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { EventsFilterPage } from '../../pages/events/events-filter/events-filter';
import { EventItem } from '../../entity/eventItem';
import { debounceTime } from 'rxjs/operators';
import { OverlayEventDetail } from '@ionic/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  @ViewChild('eventsList', { read: IonList }) eventsList: IonList;

  events: Array<EventItem> = [];
  searching: any = false;
  segment = 'all';
  shownEvents = 0;
  title: any;
  searchTerm: string = '';
  searchControl: FormControl;
  filters : any = [];
  excludedFilters : any = [];
  displayedEvents : Array<EventItem> = [];
  dateRange: any = 1;
  dateLimit: Date = new Date();
  loading;
  shownGroup = null;

  now = new Date();
  year = this.now.getFullYear();
  noevents:any =false;
  displayedEventsD : any = [];
  
  weekUCL = 5;
  texts = {
    'FAV': 'EVENTS.MESSAGEFAV',
    'FAV2': 'EVENTS.MESSAGEFAV2',
    'FAV3': 'EVENTS.MESSAGEFAV3',
    'CANCEL': 'EVENTS.CANCEL',
    'DEL': 'EVENTS.DEL',
  }
  constructor(
    public alertCtrl: AlertController,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    private eventsService: EventsService,
    public user: UserService,
    public toastCtrl: ToastController,
    private calendar: Calendar,
    public connService : ConnectivityService,
    private translateService: TranslateService,
    private loadingCtrl: LoadingController,
    private cache: CacheService,
    private loader: LoaderService,
    private router: Router,
    private utilsServices: UtilsService,
  ) {
    this.title = 'Evénements';
    this.searchControl = new FormControl();
  }

  /*Like the constructor, ngOnInit fires all his body*/
  ngOnInit() {
    this.updateDateLimit();
      this.cachedOrNot();
      this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(search => {
        this.searching = false;
        this.updateDisplayed();
      });

  }

  removeFavorite(slidingItem: IonItemSliding, itemData: any, title: string) {
    this.utilsServices.removeFavorite(slidingItem, itemData, title, this.texts, this.updateDisplayed.bind(this));
  }

  addFavorite(slidingItem: IonItemSliding, itemData: any) {
    this.utilsServices.addFavorite(slidingItem, itemData, this.texts, this.updateDisplayed.bind(this));
  }
  /*Reload events when refresh by swipe to the bottom*/
  public doRefresh(refresher) {
    if(this.connService.isOnline()) {
      this.cache.removeItem('cache-event');
      this.loadEvents('cache-event');
      refresher.target.complete();
    } else {
      this.connService.presentConnectionAlert();
      refresher.tagert.complete();
    }
  }

  public onSearchInput(){
    this.searching = true;
  }

  /*Open the details page for an event*/
  public goToEventDetail(event: EventItem) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: event
      }
    };
    this.router.navigate( ['events/details'], navigationExtras);
  }

  /*To display or close a group of events (1 group = events for one week)*/
  toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  }

  /*Check if the display group is the group in arg*/
  isGroupShown(group) {
      return this.shownGroup === group;
  }

    /*Check if data are cached or not */
    async cachedOrNot(){
      //this.cache.removeItem('cache-event');
        let key = 'cache-event';
        await this.cache.getItem(key)
        .then((data) => {
          this.loader.present('Please wait...');
          this.events=data.events;
          this.events.forEach(function(element) {
            element.startDate = new Date(element.startDate);
            element.endDate = new Date(element.endDate);
          });
          this.shownEvents = data.shownEvents;
          this.filters = data.categories;
          this.searching=false;
          this.updateDisplayed();
        })
        .catch(() => {
          console.log("Oh no! My data is expired or doesn't exist!");
          this.loadEvents(key);
        });
    }


  /*Load the list of events to display*/
  public loadEvents(key?) {
    this.searching = true;
    this.eventsList && this.eventsList.closeSlidingItems();

    //Check connexion before load events, if there is connexion => load them, else go back to the precedent page and display alert

    if(this.connService.isOnline()) {

      this.loader.present('Please wait...');
      this.eventsService.getEvents(this.segment).then(
        res => {
          let result:any = res;
          this.events = result.events;
          if(key) this.cache.saveItem(key, result);
          this.shownEvents = result.shownEvents;
          this.filters = result.categories;
          this.searching = false;
          this.noevents = this.events.length == 0;
          this.updateDisplayed();
      })
    } else {
      this.searching = false;
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

   /*Make an array with events sorted by week*/
   changeArray(array, weekUCL){
    var groups = array.reduce(function(obj,item){
      var date = new Date(item.startDate.getTime());
      date.setHours(0,0,0,0);
      date.setDate(date.getDate() + 3 - (date.getDay() +6) %7);
      var temp = new Date(date.getFullYear(),0,4);
      var week = 1 + Math.round(((date.getTime() - temp.getTime()) /86400000 -3 + (temp.getDay() +6) %7)/7);// - weekUCL;
      obj[week] = obj[week] || [];
      obj[week].push(item);
      return obj;
    }, {});
    var eventsD = Object.keys(groups).map(function(key){
      return {weeks: key, event: groups[key]};
    });
    return eventsD;
  }

  /*Returns the ISO week of the date*/
  getWeek(d:Date) {
    var date = new Date(d.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  /*Return first day of the week and last day of the week (to display range)*/
  getRangeWeek(week,year){
    var d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
    d1 = new Date(''+year+'');
    numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (week - this.getWeek(d1))));
    rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    rangeIsTo = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear() ;
    rangeIsTo = rangeIsTo.replace(/-/g, "/")
    rangeIsFrom = rangeIsFrom.replace(/-/g, "/")
    return {from:rangeIsFrom, to:rangeIsTo};
  }

  /*Update the displayed events and close the loading when it's finished*/
  public updateDisplayed() {
    this.searching = true;
    this.eventsList && this.eventsList.closeSlidingItems();

    if (this.segment === 'all') {
      this.displayedEvents = this.events.filter((item) => {
        return ( this.excludedFilters.indexOf(item.category) < 0 ) && (item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
            && (Math.floor(item.startDate.getTime()/86400000) <= Math.floor(this.dateLimit.getTime()/86400000));
      })
    } else if (this.segment === 'favorites') {
      let favEvents = [];
      this.events.filter((item) => {
        if(item.favorite || this.user.hasFavorite(item.guid)) {
          if(item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) {
            favEvents.push(item);
          }
        }
      });

      this.displayedEvents = favEvents;
    }
    this.shownEvents = this.displayedEvents.length;
    this.searching = false;
    this.displayedEventsD = this.changeArray(this.displayedEvents,this.weekUCL);
    this.loader.dismiss();
  }

  /*Display the modal with the filters and update data with them*/
  async presentFilter() {
    if(this.filters === undefined){
      this.filters = [];
    }
    let modal = await this.modalCtrl.create(
      {
        component: EventsFilterPage, 
        componentProps:{ excludedFilters : this.excludedFilters, filters : this.filters, dateRange : this.dateRange}
      }
      );
      await modal.present();
     await modal.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data) {
        data=data.data;
        let tmpRange = data[1];
        if(tmpRange !== this.dateRange) {
          this.dateRange = tmpRange;
          this.updateDateLimit();
        }
        this.excludedFilters = data[0];
        this.updateDisplayed();
      }
  });
}

  /*Update the date limit, take account if a change is done by filter with the dateRange value*/
  private updateDateLimit(){
    let today = new Date();
    this.dateLimit = new Date(today.getFullYear(), today.getMonth()+this.dateRange, today.getUTCDate()+1);
  }

  /*Add an event to the calendar of the smartphone with a first reminder 5 minutes before the course*/
  public createEvent(slidingItem: IonItemSliding, itemData: any):void{
    let options:any = {
      firstReminderMinutes:15
    };
    let message:string;
    this.translateService.get('EVENTS.MESSAGE').subscribe((res:string) => {message=res;});

    this.calendar.createEventWithOptions(itemData.title, itemData.location,
      null, itemData.startDate, itemData.endDate, options).then(() => {
        let toast = this.toastCtrl.create({
          message:  message,
          duration: 3000
        }).then(toast => toast.present());
        slidingItem.close();
      });
  }
}
