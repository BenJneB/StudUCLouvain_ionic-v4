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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LibraryItem } from 'src/app/entities/libraryItem';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';

@Component({
    selector: 'page-library-details',
    templateUrl: 'library-details.html',
    styleUrls: ['./library-details.scss'],
    animations: [
        trigger('expand', [
            state('true', style({height: '45px'})),
            state('false', style({height: '0'})),
            transition('void => *', animate('0s')),
            transition('* <=> *', animate('250ms ease-in-out'))
        ])
    ]
})

export class LibraryDetailsPage {
    libDetails: LibraryItem;
    shownGroup = null;
    searching = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public libService: LibrariesService,
        public utilsServices: UtilsService
    ) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.libDetails = this.router.getCurrentNavigation().extras.state.items;
                this.searching = true;
                this.libService.loadLibDetails(this.libDetails);
                this.searching = false;
            }
        });
    }

    toggleGroup(hours: string) {
        this.shownGroup = this.utilsServices.toggleGroup(hours, this.shownGroup);
    }

    /*Open the page of the library for more details*/
    openPage(url: string) {
        window.open(url, '_blank');
    }
}
