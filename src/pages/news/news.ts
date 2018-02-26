/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Jérôme Lemaire and Corentin Lamy
    Date : July 2017
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
import { App, List, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { NewsService } from '../../providers/rss-services/news-service';
import { NewsItem } from '../../app/entity/newsItem';
import { NewsDetailsPage } from './news-details/news-details';
import { ConnectivityService } from '../../providers/utils-services/connectivity-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {

  @ViewChild('newsList', { read: List }) newsList: List;

  news: Array<NewsItem> = [];
  segment = "P1";
  shownNews = 0;
  displayedNews : Array<NewsItem> = [];
  searching: any = false;
  searchControl: FormControl;
  searchTerm: string = '';
  title:string ="Actualités" ;
  nonews:any = false;

  constructor(
    public platform : Platform,
    public navCtrl: NavController,
    public navParams:NavParams,
    public app:App,
    public newsService : NewsService,
    public connService : ConnectivityService,
    public alertCtrl : AlertController,
              private translateService: TranslateService
  ) {
      if(this.navParams.get('title') !== undefined) {
        this.title = this.navParams.get('title');
      }
      this.app.setTitle(this.title);
      this.searchControl = new FormControl();
      this.platform.ready().then(() => {
        this.loadEvents();
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.searching = false;
          this.updateDisplayedNews();
        });
      });
  }

  ionViewDidLoad() {

  }

  public doRefresh(refresher) {
    this.loadEvents();
    refresher.complete();
  }

  public loadEvents() {
    this.searching = true;
    this.news = [];
    if(this.connService.isOnline()) {
      this.newsService.getNews(this.segment)
      .then(
        res => {
          let result:any = res;
          this.news = result.news;
          this.shownNews = result.shownNews;
          this.searching = false;
          this.updateDisplayedNews();
      })
      .catch(error => {
          if(error == 1) {
            this.loadEvents();
          } else {
            if(error == 2) {
              console.log("Loading news : YQL req timed out > limit, suppose no news to be displayed");
            } else {
              console.log("Error loading news : " + error);
            }
            this.searching = false;
            this.nonews=true;
            this.updateDisplayedNews();
          }
      });
    } else {
      this.searching = false;
      this.connService.presentConnectionAlert();
    }
  }

  public updateDisplayedNews() {
    this.searching = true;
    this.displayedNews = this.news;
    this.displayedNews = this.news.filter((item) => {
      return (item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    });
    this.shownNews = this.displayedNews.length;
    this.searching = false;
  }

  public goToNewsDetail(news: NewsItem) {
    this.navCtrl.push( NewsDetailsPage, { 'news': news });
  }
}
