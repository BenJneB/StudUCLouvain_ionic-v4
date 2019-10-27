import { CacheService } from 'ionic-cache';
/**
 Copyright (c)  Université catholique Louvain.  All rights reserved
 Authors:  Jérôme Lemaire, Corentin Lamy, Daubry Benjamin & Marchesini Bruno
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonItemSliding, IonList, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { EventItem } from 'src/app/models/eventItem';
import { EventsFilterPage } from './events-filter/events-filter';
import { EventsService } from 'src/app/services/rss-services/events-service';
import { LoaderService } from 'src/app/services/utils-services/loader-service';
import { EVENT_TEXTS, UtilsService } from 'src/app/services/utils-services/utils-services';

@Component({
    selector: 'page-events',
    templateUrl: 'events.html',
    styleUrls: ['./events.scss'],
})
export class EventsPage implements OnInit {
    @ViewChild('eventsList', {read: IonList}) eventsList: IonList;

    events: Array<EventItem> = [];
    searching: any = false;
    segment = 'all';
    shownEvents = 0;
    title: any;
    searchTerm = '';
    searchControl: FormControl;
    filters: any = [];
    excludedFilters: any = [];
    displayedEvents: Array<EventItem> = [];
    dateRange: any = 1;
    dateLimit: Date = new Date();
    loading;
    shownGroup = null;

    now = new Date();
    year = this.now.getFullYear();
    noevents: any = false;
    displayedEventsD: any = [];

    weekUCL = 5;
    texts = {
        'FAV': 'EVENTS.MESSAGEFAV',
        'FAV2': 'EVENTS.MESSAGEFAV2',
        'FAV3': 'EVENTS.MESSAGEFAV3',
        'CANCEL': 'EVENTS.CANCEL',
        'DEL': 'DELETE',
    };

    constructor(
        public modalCtrl: ModalController,
        private eventsService: EventsService,
        private translateService: TranslateService,
        private cache: CacheService,
        private loader: LoaderService,
        private utilsServices: UtilsService,
    ) {
        this.title = 'Evenements';
        this.searchControl = new FormControl();
    }

    tabChanged(newTab: any) {
        newTab = newTab.detail.value;
        if (newTab !== undefined) {
            this.segment = newTab;
            if (newTab === 'all') {
                this.cachedOrNot();
            } else {
                this.updateDisplayed();
            }
        }
    }

    ngOnInit() {
        this.updateDateLimit();
        this.cachedOrNot();
        this.utilsServices.initSearchControl(this.searchControl, this.searching);
    }

    public goToEventDetail(event: EventItem) {
        this.utilsServices.goToDetail(event, 'events/details');
    }

    async removeFavorite(slidingItem: IonItemSliding, itemData: any, title: string) {
        await this.utilsServices.removeFavorite(slidingItem, itemData, title, this.texts);
        this.updateDisplayed();
    }

    async addFavorite(slidingItem: IonItemSliding, itemData: any) {
        this.utilsServices.addFavorite(itemData, EVENT_TEXTS, slidingItem);
    }

    public doRefresh(refresher) {
        this.utilsServices.doRefresh(refresher, 'cache-event', this.loadEvents.bind(this));
    }

    cachedOrNot() {
        // this.cache.removeItem('cache-event');
        const key = 'cache-event';
        this.cache.getItem(key)
            .then(async (data) => {
                await this.loader.present('Please wait...');
                this.events = data.items;
                this.events.forEach(function (element) {
                    element.startDate = new Date(element.startDate);
                    element.endDate = new Date(element.endDate);
                });
                this.shownEvents = data.showItems;
                this.filters = data.categories;
                this.searching = false;
                this.updateDisplayed();
            })
            .catch(async () => {
                await this.loadEvents(key);
            });
    }

    public async loadEvents(key?: string) {
        this.searching = true;
        this.eventsService.getEvents(this.segment, this.searching).then(
            res => {
                const result: any = res;
                this.events = result.items;
                if (key) {
                    this.cache.saveItem(key, result);
                }
                this.shownEvents = result.shownItems;
                this.filters = result.categories;
                this.noevents = this.events.length === 0;
                this.updateDisplayed();
            });
    }

    /*Make an array with events sorted by week*/
    changeArray(array) {
        const getWeek = this.getWeek;
        const groups = array.reduce(function (obj, item) {
            const date = new Date(item.startDate.getTime());
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            const week = getWeek(date); // - weekUCL;
            obj[week] = obj[week] || [];
            obj[week].push(item);
            return obj;
        }, {});
        return this.utilsServices.getItemDisplay(groups);
    }

    private getWeek(date: Date) {
        const temp = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - temp.getTime()) / 86400000 - 3 + (temp.getDay() + 6) % 7) / 7); //  - weekUCL;
    }

    /*Returns the ISO week of the date*/
    getISOWeek(d: Date) {
        const date = new Date(d.getTime());
        date.setHours(0, 0, 0, 0);
        //  Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        //  Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return this.getWeek(date);
    }

    /*Return first day of the week and last day of the week (to display range)*/
    getRangeWeek(week, year) {
        let d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
        d1 = new Date('' + year + '');
        numOfdaysPastSinceLastMonday = d1.getDay() - 1;
        d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
        d1.setDate(d1.getDate() + (7 * (week - this.getISOWeek(d1))));
        rangeIsFrom = this.getFullDate(d1);
        d1.setDate(d1.getDate() + 6);
        rangeIsTo = this.getFullDate(d1);
        rangeIsTo = rangeIsTo.replace(/-/g, '/');
        rangeIsFrom = rangeIsFrom.replace(/-/g, '/');
        return {from: rangeIsFrom, to: rangeIsTo};
    }

    private getFullDate(d1: any): any {
        return (d1.getMonth() + 1) + '-' + d1.getDate() + '-' + d1.getFullYear();
    }

    public updateDisplayed() {
        this.searching = true;
        if (this.segment === 'all') {
            this.displayedEvents = this.utilsServices.filterItems(
                'events',
                this.events,
                this.excludedFilters,
                this.dateLimit,
                this.searchTerm
            );
        } else if (this.segment === 'favorites') {
            this.displayedEvents = this.utilsServices.filterFavoriteItems(this.events, this.searchTerm, 'events');
        }
        this.shownEvents = this.displayedEvents.length;
        this.searching = false;
        this.displayedEventsD = this.changeArray(this.displayedEvents);
        this.loader.dismiss();
    }

    async presentFilter() {
        if (this.filters === undefined) {
            this.filters = [];
        }
        const modal = await this.modalCtrl.create(
            {
                component: EventsFilterPage,
                componentProps: {excludedFilters: this.excludedFilters, filters: this.filters, dateRange: this.dateRange}
            }
        );
        modal.onDidDismiss().then((data: any) => {
            if (data) {
                data = data.data;
                const tmpRange = data[1];
                if (tmpRange !== this.dateRange) {
                    this.dateRange = tmpRange;
                    this.updateDateLimit();
                }
                this.excludedFilters = data[0];
                this.updateDisplayed();
            }
        });
        return await modal.present();
    }

    private updateDateLimit() {
        const today = new Date();
        this.dateLimit = new Date(today.getFullYear(), today.getMonth() + this.dateRange, today.getUTCDate() + 1);
    }

    toggleGroup(week: string) {
        this.shownGroup = this.utilsServices.toggleGroup(week, this.shownGroup);
    }

    public createEvent(slidingItem: IonItemSliding, itemData: any): void {
        let message = '';
        this.translateService.get('EVENTS.MESSAGE').subscribe((res: string) => {
            message = res;
        });
        const datas = {
            title: itemData.title,
            location: itemData.location,
            start: itemData.startDate,
            end: itemData.endDate
        };
        this.utilsServices.createEventInCalendar(datas, message, slidingItem);
    }
}
