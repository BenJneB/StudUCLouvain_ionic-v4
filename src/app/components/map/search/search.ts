import { Component} from '@angular/core';
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
    categories = [];
    selectedCategory: any;
    selectOptions: any = {
      header: 'Categories'
    }

    constructor(private modalCtrl: ModalController, public poiService: POIService) {
        this.poiService.loadResources().then((res: any) => {
            this.items = res.zones;
            this.categories = this.poiService.getCategories(res.zones);
            this.selectedCategory = this.categories[0];
            this.displayItems = this.items[this.selectedCategory];
        });
    }

    changeCategory(){
      this.displayItems = this.items[this.selectedCategory];
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
            id: item.sigle ? item.sigle : item.nom,
            name: item.sigle ? item.nom : '',
            pos: {lat: item.coord.lat, lng: item.coord.lng},
            img: item.vignette,
            address: item.adresse
        });
    }

}