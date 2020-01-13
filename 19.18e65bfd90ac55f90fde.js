(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{SbNa:function(n,e){n.exports='@charset "UTF-8";\n/*\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n*/\n.spinner-container {\n  width: 100%;\n  text-align: center;\n  padding: 10px; }\n'},fKBK:function(n,e){n.exports='\x3c!--\n\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n\n--\x3e\n\x3c!--EN-TETE--\x3e\n<ion-header>\n    <ion-toolbar color="bibli">\n        <ion-buttons slot="start">\n            <ion-back-button></ion-back-button>\n            <img height="28" src="./assets/img/s.png"/>\n        </ion-buttons>\n        <ion-title horizontal="center">{{title | translate}}</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n\x3c!--BODY--\x3e\n<ion-content class="ion-padding">\n    <ion-refresher (ionRefresh)="doRefresh($event)" slot="fixed">\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Pull to refresh" refreshingSpinner="circles">\n        </ion-refresher-content>\n    </ion-refresher>\n    <div *ngIf="searching" class="spinner-container">\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-list>\n        <ion-item (click)="goToLibDetails(lib)" *ngFor="let lib of libraries" button no-lines>\n            <ion-label>{{lib.name}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'},"tEs/":function(n,e){n.exports='\x3c!--\n\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n\n--\x3e\n\x3c!--EN-TETE--\x3e\n<ion-header>\n    <ion-toolbar color="bibli">\n        <ion-buttons slot="start">\n            <ion-back-button></ion-back-button>\n        </ion-buttons>\n        <ion-row>\n            <ion-col>\n                <ion-title>{{libDetails.name}}</ion-title>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class="ion-padding">\n    <ion-card>\n        <ion-card-content>\n            <ion-card-title>\n                {{\'LIBRARY.INFO\' | translate}}\n            </ion-card-title>\n            {{libDetails.name}}\n        </ion-card-content>\n\n        <ion-row class="ion-text-wrap">\n            <ion-item class="ion-text-wrap">\n                <ion-label>\n                    <ion-icon name="call" slot="start"></ion-icon>\n                    <a href="tel:{{libDetails.phone}}">{{libDetails.phone}}</a>\n                </ion-label>\n            </ion-item>\n            <ion-col class="ion-text-right">\n                <ion-button (click)="openPage(libDetails.website)" *ngIf="libDetails.website" fill="clear" size="small">\n                    <ion-icon name=\'share-alt\' slot="start"></ion-icon>\n                    Website\n                </ion-button>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="libDetails.email">\n            <ion-item>\n                <ion-label>\n                    <ion-icon name="mail" slot="start"></ion-icon> &nbsp;\n                    <a href="mailto:{{libDetails.email}}">{{libDetails.email}}</a>\n                </ion-label>\n            </ion-item>\n        </ion-row>\n\n        <ion-row class="ion-padding ion-text-wrap">\n            {{libDetails.openingHoursNote}}\n        </ion-row>\n\n        <ion-item-divider (click)="toggleGroup(\'opening_hours\')">\n            <ion-label>{{\'LIBRARY.HOUR\' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]="!utilsServices.isGroupShown(\'opening_hours\', shownGroup)">\n            <ion-label>\n                <p *ngFor="let timeSlot of libDetails.openingHours">\n                    {{timeSlot.day}} - {{timeSlot.startHour}} : {{timeSlot.endHour}}\n                </p>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)="toggleGroup(\'opening_examination_hours\')">\n            <ion-label>{{\'LIBRARY.EXAMHOUR\' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]="!utilsServices.isGroupShown(\'opening_examination_hours\', shownGroup)">\n            <ion-label>\n                <p *ngFor="let timeSlot of libDetails.openingExaminationHours">\n                    {{timeSlot.day}} - {{timeSlot.startHour}} : {{timeSlot.endHour}}\n                </p>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)="toggleGroup(\'opening_summer_hours\')">\n            <ion-label>{{\'LIBRARY.SUMMERHOUR\' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]="!utilsServices.isGroupShown(\'opening_summer_hours\', shownGroup)">\n            <ion-label>\n                <p *ngFor="let timeSlot of libDetails.openingSummerHours">\n                    {{timeSlot.day}} - {{timeSlot.startHour}} : {{timeSlot.endHour}}\n                </p>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)="toggleGroup(\'closed_dates\')">\n            <ion-label>{{\'LIBRARY.CLOSED\' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]="!utilsServices.isGroupShown(\'closed_dates\', shownGroup)" class="ion-text-wrap">\n            <ion-label>\n                <p *ngFor="let cd of libDetails.closedDates">\n                    {{cd.from}} - {{cd.to}} : {{cd.description}}\n                </p>\n            </ion-label>\n        </ion-item>\n    </ion-card>\n</ion-content>'},wuCz:function(n,e,i){"use strict";i.r(e);var t=i("mrSG"),o=i("Ip0R"),r=i("CcnG"),s=i("gIcY"),a=i("ZZ/e"),l=i("A7o+"),c=i("Gey8"),u=i("sOJy"),h=i("sp4+"),d=i("t/Na"),b=function(){return function(n,e,i,t,o,r,s,a,l,c,u,h){this.id=n,this.name=e,this.locationId=i,this.mapLocation=t,this.phone=o,this.email=r,this.website=s,this.openingHours=a||[],this.openingExaminationHours=l||[],this.openingSummerHours=c||[],this.openingHoursNote=u,this.closedDates=h||[]}}(),p=i("BRqq"),f=function(){return function(n,e,i){this.day=n,this.startHour=e,this.endHour=i}}(),m=i("Amr0"),v=function(){function n(n,e,i){this.http=n,this.wso2Service=e,this.connService=i,this.libraries=[],this.url="libraries/v1/list"}return n.prototype.loadLibraries=function(){var n=this;return this.libraries=[],new Promise(function(e){n.wso2Service.load(n.url).subscribe(function(i){n.extractLibraries(i.return.library),e({libraries:n.libraries})})})},n.prototype.loadLibDetails=function(n){var e=this;return new Promise(function(i){if(e.connService.isOnline()){var t=e.url+"/"+n.id;e.wso2Service.load(t).subscribe(function(t){return i(e.extractLibraryDetails(n,t.return.library))})}else e.connService.presentConnectionAlert(),i(n)})},n.prototype.extractLibraries=function(n){for(var e=0;e<n.length;e++){var i=n[e],t=new b(i.id,i.name);this.libraries.push(t)}},n.prototype.extractLibraryDetails=function(n,e){var i=new p.a(n.name,"","","","","");e.mapLocation&&(i.address=e.address.street+", "+e.address.postalCode+", "+e.address.locality);var t=e.locationId||-1,o=void 0===e.closedDates.length?[e.closedDates]:e.closedDates,r=e.email,s=e.website,a=e.phone,l=e.openingHoursNote;return n=Object.assign(n,{email:r,website:s,phone:a,openingHoursNote:l,locationId:t,mapLocation:i,closedDates:o}),["openingHours","openingExaminationHours","openingSummerHours"].forEach(function(i){n[i]=[],(e[i]||[]).forEach(function(e){var t=new f(e.day,e.startHour,e.endHour);n[i].push(t)})}),n},n=t.c([Object(r.B)(),t.f("design:paramtypes",[d.a,m.a,h.a])],n)}(),g=function(){function n(n,e,i,t,o){this.navCtrl=n,this.libService=e,this.connService=i,this.cache=t,this.utilsServices=o,this.searching=!1,this.cachedOrNot(),this.title="Biblioth\xe8ques"}return n.prototype.doRefresh=function(n){this.utilsServices.doRefresh(n,"cache-libraries",this.loadLibraries.bind(this))},n.prototype.loadLibraries=function(n){var e=this;this.searching=!0,this.connService.isOnline()?this.libService.loadLibraries().then(function(i){var t=i;e.libraries=t.libraries,void 0!==n&&e.cache.saveItem(n,e.libraries),e.searching=!1}):(this.searching=!1,this.navCtrl.pop(),this.connService.presentConnectionAlert())},n.prototype.goToLibDetails=function(n){this.utilsServices.goToDetail(n,"libraries/details")},n.prototype.cachedOrNot=function(){var n=this,e="cache-libraries";this.cache.getItem(e).then(function(e){n.libraries=e,n.searching=!1}).catch(function(){n.loadLibraries(e)})},n=t.c([Object(r.n)({selector:"page-libraries",template:i("fKBK"),styles:[i("SbNa")]}),t.f("design:paramtypes",[a.j,v,h.a,c.b,u.b])],n)}(),S=i("ZYCi"),L=function(){function n(n,e,i,t){var o=this;this.route=n,this.router=e,this.libService=i,this.utilsServices=t,this.shownGroup=null,this.searching=!1,this.route.queryParams.subscribe(function(){o.router.getCurrentNavigation().extras.state&&(o.libDetails=o.router.getCurrentNavigation().extras.state.items,o.searching=!0,o.libService.loadLibDetails(o.libDetails),o.searching=!1)})}return n.prototype.toggleGroup=function(n){this.shownGroup=this.utilsServices.toggleGroup(n,this.shownGroup)},n.prototype.openPage=function(n){window.open(n,"_blank")},n=t.c([Object(r.n)({selector:"page-library-details",template:i("tEs/"),styles:[i("xkKo")]}),t.f("design:paramtypes",[S.a,S.f,v,u.b])],n)}(),w=[{path:"",component:g},{path:"details",component:L}],y=function(){function n(){}return n=t.c([Object(r.J)({imports:[S.h.forChild(w)],exports:[S.h]})],n)}();i.d(e,"LibrariesPageModule",function(){return A});var A=function(){function n(){}return n=t.c([Object(r.J)({declarations:[g,L],imports:[a.f,s.b,s.d,o.b,l.b.forChild(),y],providers:[v,h.a]})],n)}()},xkKo:function(n,e){n.exports='@charset "UTF-8";\n/*\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n*/\n'}}]);