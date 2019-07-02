import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'search-modal',
  templateUrl: 'search.html',
  styleUrls: ['./search.scss'],
})
export class SearchModal {

  searchQuery = '';

  // TODO: move buildings in service/provider
  items = [
    {
      id: 'AGOR',
      name: 'Agora',
      pos: { lat: 50.669040, lng: 4.611950 },
      address: 'Place Agora 19',
      type: 'hall'
    },
    {
      id: 'BARB',
      name: 'Sainte Barbe',
      pos: { lat: 50.668178, lng: 4.621446 },
      address: 'Place Sainte Barbe 1',
      type: 'hall'
    },
    {
      id: 'CORE',
      name: 'Center for Operations Research and Econometrics',
      pos: { lat: 50.668834, lng: 4.615409 },
      address: 'Voie du Roman Pays 34',
      type: 'hall'
    },
    {
      id: 'COUB',
      name: 'Coubertin',
      pos: { lat: 50.670538, lng: 4.606796 },
      address: 'Place Coubertin',
      type: 'hall'
    },
    {
      id: 'CYCL',
      name: 'Cyclotron',
      pos: { lat: 50.666175, lng: 4.623584 },
      address: 'Chemin du Cyclotron 1',
      type: 'hall'
    },
    {
      id: 'DESC',
      name: 'Descamps',
      pos: { lat: 50.669444, lng: 4.611214 },
      address: 'Grand-Place 45',
      type: 'hall'
    },
    {
      id: 'DUPR',
      name: 'Dupriez',
      pos: { lat: 50.668130, lng: 4.611366 },
      address: 'Place Montesquieu 3',
      type: 'hall'
    },
    {
      id: 'DOYE',
      name: 'Doyens',
      pos: { lat: 50.66844, lng: 4.61261 },
      address: 'Place des Doyens 1',
      type: 'hall'
    },
    {
      id: 'ERAS',
      name: 'Erasme',
      pos: { lat: 50.669618, lng: 4.610401 },
      address: 'Place Blaise Pascal 1',
      type: 'hall'
    },
    {
      id: 'ESOP',
      name: 'Institut des Langues Vivantes (ILV)',
      pos: { lat: 50.669070, lng: 4.614903 },
      address: 'Traverse d\'Esope 1',
      type: 'hall'
    },
    {
      id: 'LAVO',
      name: 'Lavoisier',
      pos: { lat: 50.669184, lng: 4.619182 },
      address: 'Place Louis Pasteur 1',
      type: 'hall'
    },
    {
      id: 'LECL',
      name: 'Leclercq',
      pos: { lat: 50.668006, lng: 4.611857 },
      address: 'Place Montesquieu 1',
      type: 'hall'
    },
    {
      id: 'MCUR',
      name: 'Marie Curie',
      pos: { lat: 50.667736, lng: 4.620695 },
      address: 'Rue du Compas 3',
      type: 'hall'
    },
    {
      id: 'MERC',
      name: 'Mercator',
      pos: { lat: 50.669249, lng: 4.619493 },
      address: 'Place Louis Pasteur',
      type: 'hall'
    },
    {
      id: 'MONT',
      name: 'Montesquieu',
      pos: { lat: 50.66835, lng: 4.61137 },
      address: 'Rue Montesquieu 32',
      type: 'hall'
    },
    {
      id: 'MORE',
      name: 'Thomas More',
      pos: { lat: 50.668018, lng: 4.611323 },
      address: 'Place Montesquieu 2',
      type: 'hall'
    },
    {
      id: 'PCUR',
      name: 'Pierre Curie',
      pos: { lat: 50.668091, lng: 4.620550 },
      address: 'Rue du Compas 1',
      type: 'hall'
    },
    {
      id: 'SCES',
      name: 'Sciences',
      pos: { lat: 50.668282, lng: 4.619510 },
      address: 'Place des Sciences 2',
      type: 'hall'
    },
    {
      id: 'SOCR',
      name: 'Socrate',
      pos: { lat: 50.670164, lng: 4.610792 },
      address: 'Place du Cardinal Mercier 10-12',
      type: 'hall'
    },
    {
      id: 'STUD',
      name: 'Studio Agora',
      pos: { lat: 50.669227, lng: 4.612270 },
      address: 'Place Agora',
      type: 'hall'
    },
    {
      id: 'SUD',
      name: 'Croix du Sud',
      pos: { lat: 50.667010, lng: 4.620630 },
      address: 'Place Croix du Sud',
      type: 'hall'
    },
    {
      id: 'VHEL',
      name: 'Van Helmont',
      pos: { lat: 50.669450, lng: 4.619263 },
      address: 'Place Louis Pasteur 2',
      type: 'hall'
    }
  ];
  displayItems = [];

  constructor(private modalCtrl: ModalController) {
    this.displayItems = this.items;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getImgSource(id) {
    return `assets/img/buildings/${id}.jpg`;
  }

  search(event) {
    const q = event.detail.value;
    this.displayItems = this.items.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.id.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        v.address.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  select(item) {
    this.modalCtrl.dismiss({
      id: item.id,
      name: item.name,
      pos: item.pos,
      img: this.getImgSource(item.id),
      address: item.address
    });
  }

}
