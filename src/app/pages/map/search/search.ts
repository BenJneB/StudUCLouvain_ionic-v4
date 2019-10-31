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
        const q = event.detail.value.toLowerCase();
        this.items = this.items.filter((obj) => {
            return [obj.title, obj.code, obj.address].some(
                (property) => property.toLowerCase().indexOf(q) > -1
            );
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
