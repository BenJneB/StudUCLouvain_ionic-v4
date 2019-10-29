import { MapService } from '../src/app/services/map-services/map-service';


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
