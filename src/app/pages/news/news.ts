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
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonContent, IonList } from '@ionic/angular';

import { NewsItem } from 'src/app/entities/newsItem';
import { NewsService } from 'src/app/services/rss-services/news-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { FacService } from 'src/app/services/utils-services/fac-service';
import { LoaderService } from 'src/app/services/utils-services/loader-service';
import { UserService } from 'src/app/services/utils-services/user-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  styleUrls: ['./news.scss'],
})
export class NewsPage implements OnInit {

  @ViewChild('newsList', { read: IonList }) newsList: IonList;
  @ViewChild('news') content: IonContent;

  news: Array<NewsItem> = [];
  segment = 'univ';
  subsegment = 'P1';
  facsegment = 'news';
  shownNews = 0;
  displayedNews: Array<NewsItem> = [];
  searching: any = false;
  searchControl: FormControl;
  searchTerm = '';
  title = 'Actualités';
  nonews: any = false;
  loading;
  fac = '';
  listFac: any = [];
  site = '';
  rss = '';
  // url = 'assets/data/fac.json';

  constructor(
    public userS: UserService,
    public newsService: NewsService,
    public connService: ConnectivityService,
    private iab: InAppBrowser,
    public facService: FacService,
    private cache: CacheService,
    private loader: LoaderService,
    private utilsServices: UtilsService
  ) {
    this.searchControl = new FormControl();
    this.facService.loadResources().then((data) => {
      this.listFac = data;
    });
  }

  /*load the view, Call function to load news, display them*/
  ngOnInit() {
    this.cachedOrNot();
    this.utilsServices.initSearchControl(this.searchControl, this.searching);
  }

  /*Open a page with the details of a news*/
  public openURL(url: string) {
    this.iab.create(url, '_system', 'location=yes');
  }

  /*Select the good fac for the selection of the user and load the good news*/
  updateFac(fac: string) {
    this.fac = fac;
    this.userS.addFac(this.fac);
    this.findSite();
    this.loadNews();
  }

  /*If there is a site for a fac, return the good site*/
  findSite() {
    for (const sector of this.listFac) {
      this.getAvailableSites(sector);
    }
  }

  private getAvailableSites(sector: any) {
    for (const facs of sector.facs) {
      if (facs.acro === this.fac) {
        this.site = facs.site;
        this.rss = facs.rss;
      }
    }
  }

  removeFac() {
    this.userS.removeFac();
  }

  /*Reload news if pull bellow the view*/
  public doRefresh(refresher) {
    const doRefresh = this.segment === 'univ' || (
      this.segment === 'fac' && this.facsegment === 'news' && this.userS.hasFac()
    );
    if (this.connService.isOnline()) {
      this.handleOnlineRefresh(doRefresh, refresher);
    } else {
      this.connService.presentConnectionAlert();
      refresher.target.complete();
    }
  }

  private handleOnlineRefresh(doRefresh: boolean, refresher: any) {
    if (doRefresh) {
      if (this.segment === 'univ') {
        const key = this.getKey();
        this.cache.removeItem(key);
        this.loadNews(key);
      } else {
        this.loadNews();
      }
    }
    refresher.target.complete();
  }

  private getKey() {
    const part = this.subsegment;
    let key;
    if (part === 'P1') {
      key = 'cache-P1';
    } else if (part === 'P2') {
      key = 'cache-P2';
    } else {
      key = 'cache-P3';
    }
    return key;
  }

  /*Tab change*/
  public tabChanged(newTab: any) {
    newTab = newTab.detail.value;
    if (newTab !== undefined) {
      this.segment = newTab;
      if (newTab === 'univ') {
        this.cachedOrNot();
      } else
        if (newTab === 'fac') {
          this.manageMainTabFac();
        }
    }
  }

  public manageMainTabFac() {
    this.fac = this.userS.fac;
    if (this.facsegment === 'news' && this.userS.hasFac()) {
      this.findSite();
      this.loadNews();
    }
  }

  /*Check if data are cached or not */
  cachedOrNot() {
    // this.cache.removeItem('cache-P1');
    if (this.segment === 'univ') {
      const key = this.getKey();
      this.cache.getItem(key)
        .then(async (data) => {
          await this.loader.present('Please wait...');
          this.news = data.items;
          this.shownNews = data.showItems;
          this.searching = false;
          this.updateDisplayed();
        })
        .catch(async () => {
          await this.loadNews(key);
        });
    } else {
      this.loadNews();
    }
  }

  /*Load news to display*/
  public async loadNews(key?: string) {
    this.searching = true;
    this.news = [];
    let actu = this.subsegment;
    if (this.segment === 'fac' && this.facsegment === 'news') { actu = this.rss; }
    this.newsService.getNews(actu, this.searching).then(
      result => {
        this.news = result.items;
        if (key) { this.cache.saveItem(key, result); }
        this.shownNews = result.showItems;
        this.nonews = this.news.length === 0;
        this.updateDisplayed();
      });
    // this.updateDisplayed();
  }

  /*Update display news*/
  public updateDisplayed() {
    this.searching = true;
    this.displayedNews = this.news;
    this.filterUpdatedNews();
    this.shownNews = this.displayedNews.length;
    this.nonews = this.shownNews === 0;
    this.searching = false;
    this.loader.dismiss();
  }

  private filterUpdatedNews() {
    this.displayedNews = this.news.filter((item) => {
      return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  /*When click on a news, go to the page with more details*/
  public goToNewsDetail(news: NewsItem) {
    this.utilsServices.goToDetail(news, 'news/details');
  }
}
