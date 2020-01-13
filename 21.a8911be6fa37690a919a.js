(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{ETeb:function(n,e){n.exports='\x3c!--\n\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n\n--\x3e\n\x3c!--EN-TETE--\x3e\n<ion-header>\n    <ion-toolbar color="support">\n        <ion-buttons slot="start">\n            <ion-back-button></ion-back-button>\n            <img height="28" src="./assets/img/s.png"/>\n        </ion-buttons>\n        <ion-title>{{\'EMPLOYEE.INFO\' | translate}}</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n\x3c!--BODY--\x3e\n<ion-content class="ion-padding">\n    <ion-card>\n        <ion-card-header class="ion-text-wrap">\n            <h1><b>{{empDetails.firstname}} {{empDetails.lastname}}</b></h1>\n        </ion-card-header>\n\n        <ion-row class="ion-text-wrap">\n            <ion-list>\n                <ion-item *ngIf="empDetails.contracts" style="text-transform:uppercase">\n                    <ion-label>\n                        <p *ngIf="empDetails.contracts.contract.grade!=null">({{c.grade}})</p>\n                    </ion-label>\n                </ion-item>\n                <ion-item *ngFor="let emp of empDetails.departments.department">\n                    <ion-label>\n                        <p *ngIf="emp.linkType == \'Affectation\'">{{emp.entity.acronyms}} -- {{emp.entity.name_fr}}\n                            ({{emp.entity.acronym}})</p>\n                        <p *ngIf="emp.linkType == \'Appartenance\'">\n                            <ion-icon name="return-right"></ion-icon>\n                            {{emp.entity.acronyms}} -- {{emp.entity.name_fr}}\n                            ({{emp.entity.acronym}})\n                        </p>\n                    </ion-label>\n                </ion-item>\n            </ion-list>\n        </ion-row>\n\n\n        <ion-card>\n            <ion-card-content>\n                <ion-card-title>\n                    {{\'EMPLOYEE.CONTACT\' | translate}}\n                </ion-card-title>\n            </ion-card-content>\n            <ion-row>\n                <ion-col><b>{{\'EMPLOYEE.ADRESSE\' | translate}}</b></ion-col>\n                <ion-col>\n                    {{empDetails.address?.acronym}}<br>\n                    {{empDetails.address?.streetName}} {{empDetails.address?.streetNumber}}\n                    /{{empDetails.address?.mailBox}}<br>\n                    {{empDetails.address?.postCode}} {{empDetails.address?.town}}<br>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col><b>{{\'EMPLOYEE.MAIL\' | translate}}</b></ion-col>\n                <ion-col>\n                    <a href="mailto:{{empDetails?.email}}" target="_top">{{empDetails?.email}}</a>\n                </ion-col>\n            </ion-row>\n\n\n            <ion-card *ngFor="let contact of empDetails.businessContacts?.businessContact">\n                <ion-card-content>\n                    <ion-card-title>\n                        {{contact.acronym}}\n                    </ion-card-title>\n                </ion-card-content>\n\n                <ion-row>\n                    <ion-col> {{\'EMPLOYEE.TEL\' | translate}} </ion-col>\n                    <ion-col><a href="tel:{{contact.phone}}">{{contact.phone}}</a></ion-col>\n                </ion-row>\n                <ion-row *ngIf="contact.secretary!=null">\n                    <ion-col> {{\'EMPLOYEE.SECRETARIAT\' | translate}} </ion-col>\n                    <ion-col><a href="tel:{{contact.secretary}}">{{contact.secretary}}</a></ion-col>\n                </ion-row>\n            </ion-card>\n        </ion-card>\n    </ion-card>\n</ion-content>'},G5Ms:function(n,e){n.exports='@charset "UTF-8";\n/*\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n*/\n'},KxW3:function(n,e){n.exports="\x3c!--\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n\n--\x3e\n\x3c!--EN-TETE--\x3e\n<ion-header>\n    <ion-toolbar color=\"support\">\n        <ion-buttons slot=\"start\">\n            <ion-back-button></ion-back-button>\n            <img height=\"28\" src=\"./assets/img/s.png\"/>\n        </ion-buttons>\n        <ion-title horizontal=\"center\">{{title | translate}}</ion-title>\n    </ion-toolbar>\n    <ion-segment [(ngModel)]=\"segment\" name=\"segment\">\n        <ion-segment-button value=\"aide\">\n            <ion-label>{{'HELP.SEGMENT2' | translate}}</ion-label>\n        </ion-segment-button>\n        <ion-segment-button value=\"info\">\n            <ion-label>{{'HELP.SEGMENT1' | translate}}</ion-label>\n        </ion-segment-button>\n\n        <ion-segment-button value=\"tuto\">\n            <ion-label> {{'HELP.SEGMENT3' | translate}}</ion-label>\n        </ion-segment-button>\n    </ion-segment>\n</ion-header>\n\n\x3c!--BODY--\x3e\n<ion-content class=\"ion-padding has-header\">\n    \x3c!----------------INFORMATIONS ----------------------\x3e\n    <ng-container *ngIf=\"segment==='info'\">\n        <ion-item-divider (click)=\"toggleGroup('prob_app')\">\n            <ion-label>{{'HELP.PROB' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('prob_app', shownGroup)\">\n            <ion-label>\n                <div item-content>\n                    <p [innerHTML]=\"'HELP.TEXTP1' | translate\"></p>\n                    <p><a href=\"mailto:studuclouvain@uclouvain.be\">studuclouvain@uclouvain.be</a></p>\n                </div>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('service_desk')\">\n            <ion-label>{{'HELP.DESK' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('service_desk', shownGroup)\">\n            <ion-label>\n                <div item-content>\n                    <p [innerHTML]=\"'HELP.TEXT1' | translate\"></p>\n                    <p> {{'HELP.TEXT2' | translate}}</p>\n                    <p>{{'HELP.TEXT3' | translate}}</p>\n                    <p [innerHTML]=\"'HELP.TEXT4' | translate\"></p>\n                </div>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('smartcard')\">\n            <ion-label>{{'HELP.CARD' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('smartcard', shownGroup)\">\n            <ion-label>\n                <div item-content>\n                    <p>{{'HELP.TEXT5' | translate}}</p>\n                    <p [innerHTML]=\"'HELP.TEXT6' | translate\"></p>\n                    <p><img alt=\"smartcard-recto\" height=\"130\" src=\"./assets/img/smartcard/smartcard-1.jpg\"\n                            width=\"209\"/>\n                        <img alt=\"smartcard-verso\" height=\"129\" src=\"./assets/img/smartcard/smartcard-2.jpg\"\n                             width=\"209\"/></p>\n                    <p [innerHTML]=\"'HELP.TEXT7' | translate\"></p>\n                    <ion-button (click)=\"openURL('https://uclouvain.be/fr/repertoires/entites/sper')\">\n                        {{'HELP.TEXTBTN1' | translate}}</ion-button>\n                    .\n                    <p>{{'HELP.TEXT8' | translate}}\n                        <ion-button (click)=\"openURL('http://www.uclouvain.be/inscription')\">\n                            {{'HELP.TEXTBTN2' | translate}}</ion-button>\n                        .\n                        <br/>{{'HELP.TEXT9' | translate}}\n                    </p>\n                    <p [innerHTML]=\"'HELP.TEXT10' | translate\"></p>\n                    <ion-button\n                            (click)=\"openURL('https://carte.uclouvain.be/carte/activation')\">{{'HELP.TEXTBTN3' | translate}}\n                    </ion-button>\n                    .\n                </div>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('wifi')\">\n            <ion-label>{{'HELP.WIFI' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('wifi', shownGroup)\">\n            <ion-label>\n                <div item-content>\n                    <p>{{'HELP.TEXT11' | translate}}</p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT12' | translate}}</h4>\n                    <p [innerHTML]=\"'HELP.TEXT13' | translate\" style=\"text-align: justify;\"></p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT14' | translate}}</h4>\n                    <p style=\"text-align: justify;\">{{'HELP.TEXT15' | translate}}\n                        <ion-button\n                                (click)=\"openURL('https://uclouvain.be/fr/decouvrir/wifi-eduroam.html')\">{{'HELP.TEXTBTN4' | translate}}\n                        </ion-button>\n                    </p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT16' | translate}}</h4>\n                    <p [innerHTML]=\"'HELP.TEXT17' | translate\" style=\"text-align: justify;\"></p>\n                    <p [innerHTML]=\"'HELP.TEXT18' | translate\" style=\"text-align: justify;\"></p>\n                    <ion-button\n                            (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/eaabb465-8762-4e61-81fb-bf9ff97a3117/guide_rapide_config_WiFi_visiteurs.pdf?guest=true')\">\n                        {{'HELP.GUIDE' | translate}}</ion-button>\n                    <br>\n                    <p>{{'HELP.TEXT19' | translate}}\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/e032a935-4cf5-41cd-91a8-228a8e611f89/guide_rapide_config_WiFi_etudiants.pdf?guest=true')\">\n                            {{'HELP.GUIDE' | translate}}</ion-button>\n                        <br>\n\n                        {{'HELP.TEXT20' | translate}}<br>\n                        - Windows Vista (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/2993993e-34b3-4273-bb7d-0cacd530c057/WiFi-WindowsVista-archives.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - Windows 7 : Windows 7 (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/4a246eb1-fdc8-44d4-bd2b-e0fc6927676a/UCL-Windows7.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        ) {{'HELP.TEXT21' | translate}} (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/92b608b8-552d-421c-a24b-86928de16770/UCL-Windows7(alternative).pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - Windows 8 (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/025d5fd4-a5da-4e55-8a2b-bf169fa055c3/UCL-Windows8.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - {{'HELP.TEXT22' | translate}} (Windows) (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/733b2daa-1c9e-4ef2-b53d-e2ebf902e3dc/UCL-Windows8.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - Mac OS X : Tiger &amp; Panther (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/176331e0-74e6-4f08-83ac-70c540f14569/UCL-TigerPanther.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        ), L\xe9opard (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/60dabfc7-52a0-44ab-8649-66ea48909fef/UCL-TigerPanther.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        ) {{'HELP.TEXT23' | translate}} (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/5318f676-6f33-4358-9c80-3381bd6f4699/UCL-TigerPanther.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - Linux : wpa_supplicant (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/bac993da-6d7f-45d4-9e47-4558044e9313/UCL-Linux_wpa_supplicant.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        ) {{'HELP.TEXT24' | translate}} Ubuntu (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/824d873b-bd79-49a0-9919-1373fd831c23/UCL-Ubuntu.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - iPhone/iPad (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/efa8fa47-8ccd-4043-96bd-a8bb3903df32/UCL-iPodTouch.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )<br>\n                        - Andro\xeed (\n                        <ion-button\n                                (click)=\"openURL('https://alfresco.uclouvain.be/alfresco/service/guest/streamDownload/workspace/SpacesStore/f855b037-b445-4f38-b344-a61dc0add440/UCL-Android.pdf?guest=true')\">\n                            pdf\n                        </ion-button>\n                        )\n                    </p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT25' | translate}}</h4>\n                    <p [innerHTML]=\"'HELP.TEXT26' | translate\" style=\"text-align: justify;\"></p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT27' | translate}}</h4>\n                    <p [innerHTML]=\"'HELP.TEXT28' | translate\" style=\"text-align: justify;\"></p>\n                    <h4 style=\"text-align: justify;\">{{'HELP.TEXT29' | translate}}</h4>\n                    <p style=\"text-align: justify;\">\n                        <ion-button (click)=\"openURL('https://uclouvain.be/fr/decouvrir/service-desk.html')\">\n                            {{'HELP.TEXTBTN5' | translate}}</ion-button>\n                    </p>\n                </div>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('rep')\" no-lines>\n            <ion-label>{{'HELP.REPERTOIRE' | translate}}</ion-label>\n        </ion-item-divider>\n\n        <ion-card [hidden]=\"!utilsServices.isGroupShown('rep', shownGroup)\">\n            <ion-card-content>\n                <ion-list class=\"ilist\" no-lines>\n                    <ion-item [(ngModel)]=\"lastname\" ngDefaultControl no-lines>\n                        <ion-label color=\"primary\">{{'HELP.NAME' | translate}}</ion-label>\n                        <ion-input placeholder=\"nom\" type=\"text\"></ion-input>\n                    </ion-item>\n                    <ion-item [(ngModel)]=\"firstname\" ngDefaultControl no-lines>\n                        <ion-label color=\"primary\">{{'HELP.FIRSTNAME' | translate}}</ion-label>\n                        <ion-input placeholder=\"pr\xe9nom\" type=\"text\"></ion-input>\n                    </ion-item>\n                </ion-list>\n                <ion-row center>\n                    <ion-col class=\"ion-text-center\">\n                        <ion-button (click)=\"update()\" shape=\"round\">{{'HELP.SEARCH' | translate}}</ion-button>\n                    </ion-col>\n                </ion-row>\n\n                <ion-list>\n                    <ion-item (click)=\"goToEmpDetails(emp)\" *ngFor=\"let emp of employees\" button no-lines>\n                        <ion-label>{{emp.lastname}} {{emp.firstname}}</ion-label>\n                    </ion-item>\n                </ion-list>\n            </ion-card-content>\n        </ion-card>\n    </ng-container>\n\n    \x3c!----------------SERVICES D AIDES ----------------------\x3e\n    <ng-container *ngIf=\"segment==='aide'\">\n        <h1 style=\"text-align:center\"><strong> {{'HELP.AIDE1' | translate}} </strong></h1>\n        <ion-button (click)=\"openURL('https://uclouvain.be/fr/etudier/aide')\" fill=\"clear\" size=\"small\">\n            <ion-icon name='share-alt' slot=\"start\"></ion-icon>\n            {{'HELP.WEB' | translate}}\n        </ion-button>\n        <p>{{'HELP.AIDE2' | translate}}</p>\n\n        <p>{{'HELP.AIDE3' | translate}}</p>\n\n        <p>{{'HELP.AIDE4' | translate}}</p>\n        <ul>\n            <li>{{'HELP.AIDE5' | translate}}</li>\n            <li>{{'HELP.AIDE6' | translate}}</li>\n            <li>{{'HELP.AIDE7' | translate}}</li>\n            <li>{{'HELP.AIDE8' | translate}}</li>\n            <li>{{'HELP.AIDE9' | translate}}</li>\n            <li>{{'HELP.AIDE10' | translate}}</li>\n            <li>{{'HELP.AIDE11' | translate}}</li>\n        </ul>\n\n        <ion-card>\n            <ion-row>\n                <ion-col><strong>{{'HELP.DIR' | translate}}</strong></ion-col>\n                <ion-col> Florence Vanderstichelen</ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col><strong>{{'HELP.ADRESSE' | translate}} </strong></ion-col>\n                <ion-col> Logement 7 <br>\n                    Rue des Wallons 10, bo\xeete L1.01.01,<br>\n                    1348, Louvain-la-Neuve\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col><strong>{{'HELP.TEL' | translate}}</strong></ion-col>\n                <ion-col><a href=\"tel:+32 10 47 20 02\">+32 10 47 20 02</a></ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col><strong>{{'HELP.FAX' | translate}}</strong></ion-col>\n                <ion-col><a href=\"tel:+32 10 47 27 30\">+32 10 47 27 30</a></ion-col>\n            </ion-row>\n        </ion-card>\n\n        <ion-item-divider (click)=\"toggleGroup('socfi')\">\n            <ion-label>\n                <strong>{{'HELP.SOCFI' | translate}}</strong>\n            </ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('socfi', shownGroup)\" class=\"ion-text-wrap\">\n            <ion-label>\n                <ion-button (click)=\"openURL('https://uclouvain.be/fr/etudier/aide/aidesociale.html')\" fill=\"clear\"\n                            size=\"small\">\n                    <ion-icon name='share-alt' slot=\"start\"></ion-icon>\n                    {{'HELP.WEB' | translate}}\n                </ion-button>\n                <p>{{'HELP.AIDE12' | translate}}</p><br>\n\n                <p [innerHTML]=\"'HELP.AIDE13' | translate\"></p><br>\n\n                <p [innerHTML]=\"'HELP.AIDE14' | translate\"></p><br>\n\n                <p>{{'HELP.AIDE15' | translate}}</p><br>\n\n                <p>{{'HELP.AIDE16' | translate}}</p>\n                <p>\n                <li>{{'HELP.AIDE17' | translate}}</li>\n                <li>{{'HELP.AIDE18' | translate}}</li>\n                <li>{{'HELP.AIDE19' | translate}}</li>\n                </p><br>\n\n                <p><strong>{{'HELP.AIDE20' | translate}}</strong></p>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('sante')\">\n            <ion-label>\n                <strong>{{'HELP.SANTE' | translate}}</strong>\n            </ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('sante', shownGroup)\" class=\"ion-text-wrap\">\n            <ion-label>\n                <ion-button (click)=\"openURL('https://uclouvain.be/fr/etudier/aide/aide-sante.html')\" fill=\"clear\"\n                            size=\"small\">\n                    <ion-icon name='share-alt' slot=\"start\"></ion-icon>\n                    {{'HELP.WEB' | translate}}\n                </ion-button>\n                <p>{{'HELP.AIDE21' | translate}}</p><br>\n                <p><strong>{{'HELP.AIDE22' | translate}}</strong></p>\n                <p>{{'HELP.SANTE1' | translate}}</p><br>\n                <p>{{'HELP.SANTE2' | translate}}</p><br>\n                <p>{{'HELP.SANTE3' | translate}}</p><br>\n\n                <p><strong>{{'HELP.AIDE23' | translate}}</strong></p>\n                <p>{{'HELP.SANTE4' | translate}}</p><br>\n                <p>{{'HELP.SANTE5' | translate}}</p><br>\n                <p>{{'HELP.SANTE6' | translate}}</p><br>\n                <p>{{'HELP.SANTE7' | translate}}</p><br>\n\n                <p><strong>{{'HELP.AIDE24' | translate}}</strong></p>\n                <p>{{'HELP.SANTE8' | translate}}</p><br>\n                <p>{{'HELP.SANTE9' | translate}}</p>\n            </ion-label>\n        </ion-item>\n\n        <ion-item-divider (click)=\"toggleGroup('psyped')\">\n            <ion-label>\n                <strong>{{'HELP.PSYPED' | translate}}</strong>\n            </ion-label>\n        </ion-item-divider>\n\n        <ion-item [hidden]=\"!utilsServices.isGroupShown('psyped', shownGroup)\" class=\"ion-text-wrap\">\n            <ion-label>\n                <ion-button (click)=\"openURL('https://uclouvain.be/fr/etudier/aide/planning.html')\" fill=\"clear\"\n                            size=\"small\">\n                    <ion-icon name='share-alt' slot=\"start\"></ion-icon>\n                    {{'HELP.WEB' | translate}}\n                </ion-button>\n                <p>{{'HELP.AIDE25' | translate}}</p><br>\n                <p>{{'HELP.AIDE26' | translate}}</p><br>\n                <p>{{'HELP.AIDE27' | translate}}</p><br>\n                <p>{{'HELP.AIDE28' | translate}}</p>\n            </ion-label>\n        </ion-item>\n    </ng-container>\n\n\n    \x3c!----------------------------------------- TUTO -------------------------------------\x3e\n    <ng-container *ngIf=\"segment==='tuto'\">\n\n        <p style=\"text-align:center\">\n            <ion-button (click)=\"openURL('https://www.youtube.com/watch?v=Mfy2y7mZ7-Y')\">{{'HELP.TUTO3' | translate }}\n            </ion-button>\n        </p>\n        <h2 class=\"ion-text-center\"><strong>{{'HELP.TUTOTITLE' | translate }}</strong></h2>\n        <p style=\"text-align:center\">\n            <ion-button (click)=\"openURL('https://www.youtube.com/watch?v=UVXpEP_0vnc')\">{{'HELP.TUTO1' | translate }}\n            </ion-button>\n        </p>\n        <p style=\"text-align:center\">\n            <ion-button (click)=\"openURL('https://www.youtube.com/watch?v=k243CT-ylEU')\">{{'HELP.TUTO2' | translate }}\n            </ion-button>\n        </p>\n\n\n    </ng-container>\n\n</ion-content>"},VZTe:function(n,e){n.exports='@charset "UTF-8";\n/*\n    Copyright (c)  Universit\xe9 catholique Louvain.  All rights reserved\n    Authors : Benjamin Daubry & Bruno Marchesini and J\xe9r\xf4me Lemaire & Corentin Lamy\n    Date : 2018-2019\n    This file is part of Stud.UCLouvain\n    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.\n\n    Stud.UCLouvain is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    Stud.UCLouvain is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.\n*/\n.spinner-container {\n  width: 100%;\n  text-align: center;\n  padding: 10px; }\n'},ZlwT:function(n,e,t){"use strict";t.r(e);var i=t("mrSG"),o=t("Ip0R"),a=t("CcnG"),r=t("gIcY"),s=t("ZZ/e"),l=t("A7o+"),c=t("XlaX"),u=t("sOJy"),p=t("ihYY"),d=t("9B/o"),h=t("t/Na"),b=function(){return function(n,e,t,i,o,a,r,s,l,c){this.matric_fgs=n,this.lastname=e,this.firstname=t,this.email=i,this.departments=o,this.address=a,this.businessContacts=r,this.contracts=s,this.gender=l,this.photo_url=c}}(),f=t("sp4+"),m=t("Amr0"),E=function(){function n(n,e,t){this.http=n,this.wso2Service=e,this.connService=t,this.employees=[],this.url="directories/v1/employees/"}return n.prototype.searchEmployees=function(n,e){var t=this;this.employees=[];var i=this.url;i+="search?";for(var o=0;o<n.length;o++)i+=n[o]+"="+e[o],o!==n.length-1&&(i+="&");return i+="&page=1&pageSize=10",new Promise(function(n){t.connService.isOnline()?t.wso2Service.load(i).subscribe(function(e){null!==e.persons&&t.extractEmployees(e.persons.person),n(t.employees)}):(t.connService.presentConnectionAlert(),n(t.employees))})},n.prototype.loadEmpDetails=function(n){var e=this;return new Promise(function(t){var i=e.url+n.matric_fgs+"/detail";e.wso2Service.load(i).subscribe(function(i){n=e.extractEmployeeDetails(n,i.businessInformation),t({empDetails:n})})})},n.prototype.extractEmployees=function(n){if(null!==n)for(var e=0;e<n.length;e++){var t=n[e],i=new b(t.matric_fgs,t.lastname,t.firstname,t.email,t.departments);this.employees.push(i)}},n.prototype.extractEmployeeDetails=function(n,e){return n.address=e.address,n.contracts=e.contracts,n.businessContacts=e.businessContacts,n.gender=e.gender,n.photo_url=e.photo_url,n},n=i.c([Object(a.B)(),i.f("design:paramtypes",[h.a,m.a,f.a])],n)}(),L=function(){function n(n,e,t,i){this.iab=n,this.repService=e,this.loader=t,this.utilsServices=i,this.shownGroup=null,this.searching=!1,this.lastname="",this.firstname="",this.segment="aide",this.shownHelp=null,this.title="Support"}return n.prototype.update=function(){return i.b(this,void 0,void 0,function(){var n,e,t,o,a,r,s,l;return i.e(this,function(i){switch(i.label){case 0:return[4,this.loader.present("Please wait..")];case 1:for(i.sent(),n=[],e=[],t=[{field:this.lastname,text:"lastname"},{field:this.firstname,text:"firstname"}],o=0,a=t;o<a.length;o++)r=a[o],s=r.field,l=r.text,s.length>0&&(e.push(s),n.push(l));return this.searchEmployees(n,e),[2]}})})},n.prototype.toggleGroup=function(n){this.shownGroup=this.utilsServices.toggleGroup(n,this.shownGroup)},n.prototype.searchEmployees=function(n,e){return i.b(this,void 0,void 0,function(){var t=this;return i.e(this,function(i){switch(i.label){case 0:return this.searching=!0,[4,this.repService.searchEmployees(n,e).then(function(n){t.employees=n})];case 1:return i.sent(),this.searching=!1,this.loader.dismiss(),[2]}})})},n.prototype.goToEmpDetails=function(n){this.utilsServices.goToDetail(n,"support/employee")},n.prototype.openURL=function(n){this.iab.create(n,"_system","location=yes")},n=i.c([Object(a.n)({selector:"page-support",template:t("KxW3"),animations:[Object(p.e)("expand",[Object(p.b)("true",Object(p.c)({height:"45px"})),Object(p.b)("false",Object(p.c)({height:"0"})),Object(p.d)("void => *",Object(p.a)("0s")),Object(p.d)("* <=> *",Object(p.a)("250ms ease-in-out"))])],styles:[t("VZTe")]}),i.f("design:paramtypes",[d.a,E,c.a,u.b])],n)}(),g=t("ZYCi"),v=function(){function n(n,e,t,i){var o=this;this.route=n,this.router=e,this.repService=t,this.connService=i,this.shownGroup=null,this.searching=!1,this.route.queryParams.subscribe(function(){o.router.getCurrentNavigation().extras.state&&(o.empDetails=o.router.getCurrentNavigation().extras.state.items),o.searching=!0,o.connService.isOnline()?o.repService.loadEmpDetails(o.empDetails).then(function(n){var e=n;o.empDetails=e.empDetails,o.searching=!1}):(o.searching=!1,o.connService.presentConnectionAlert())})}return n.prototype.openPage=function(n){window.open(n,"_blank")},n=i.c([Object(a.n)({selector:"page-employee-details",template:t("ETeb"),animations:[Object(p.e)("expand",[Object(p.b)("true",Object(p.c)({height:"45px"})),Object(p.b)("false",Object(p.c)({height:"0"})),Object(p.d)("void => *",Object(p.a)("0s")),Object(p.d)("* <=> *",Object(p.a)("250ms ease-in-out"))])],styles:[t("G5Ms")]}),i.f("design:paramtypes",[g.a,g.f,E,f.a])],n)}(),T=[{path:"",component:L},{path:"employee",component:v}],w=function(){function n(){}return n=i.c([Object(a.J)({imports:[g.h.forChild(T)],exports:[g.h]})],n)}();t.d(e,"SupportPageModule",function(){return P});var P=function(){function n(){}return n=i.c([Object(a.J)({declarations:[L,v],imports:[s.f,r.b,r.d,o.b,l.b.forChild(),w],providers:[E]})],n)}()}}]);