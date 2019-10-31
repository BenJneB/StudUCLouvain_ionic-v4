import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { POIService } from 'src/app/services/map-services/poi-service';

@Component({
    selector: 'search-modal',
    templateUrl: 'search.html',
    styleUrls: ['./search.scss'],
})
export class SearchModal {

    searchQuery = '';
    items: any = [];
    displayItems = [];

    constructor(private modalCtrl: ModalController, public poiService: POIService) {
        this.poiService.loadResources().then(res => {
            this.items = res[0].auditoires.list;
            this.displayItems = this.items;
        });
    }

    close() {
        this.modalCtrl.dismiss();
    }

    search(event) {
        const q = event.detail.value;
        this.items = this.items.filter((v) => {
            return v.title.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                v.code.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                v.address.toLowerCase().indexOf(q.toLowerCase()) > -1;

        });
    }

    select(item) {
        this.modalCtrl.dismiss({
            id: item.code,
            name: item.title,
            pos: {lat: item.lat, lng: item.lng},
            img: item.vignette,
            address: item.address
        });
    }

}
