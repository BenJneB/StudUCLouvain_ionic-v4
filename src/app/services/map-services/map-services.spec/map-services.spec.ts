import { MapService } from '../map-service';

describe('MapService', () => {
    let mapService: MapService;

    beforeEach(() => {
        mapService = new MapService();
    });

    it('should create service', () => expect(mapService).toBeDefined());

    describe('getCampusLocation method', () => {
        it('should return campus position (lat, lng)', () => {
            mapService.campusLocations['TEST'] = {
                'lat': 0.0,
                'lng': 0.0
            };
            const result = mapService.getCampusLocation('TEST');
            expect(result).toEqual(mapService.campusLocations['TEST']);
        });
    });
});
