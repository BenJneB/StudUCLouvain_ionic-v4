import { MapService } from '../src/app/services/map-services/map-service';
import { LatLngExpression, Marker, Popup } from 'leaflet';


export class MockMapService extends MapService {
    constructor() {
        super();
    }

    getCampusLocation(campus: any) {
        return {
            'lat': 0.0,
            'lng': 0.0
        };
    }
}

export function newMockMapService() {
    return new MockMapService();
}

export class LeafletMarkerMock extends Marker {
    constructor() {
        super({lat: 0.0, lng: 0.0});
    }

    getPopup() {
        return new Popup();
    }

    setLatLng(a: LatLngExpression) {
        return this;
    }
}

export class LeafletMapMock {
    fire() {
    }

    on() {
    }

    addLayer() {
    }
}
