import { newMockUtilsService } from '../../../../../test-config/MockUtilsService';
import { AdeService } from '../ade-service';
import { HttpClientMock } from '../../../../../test-config/MockStudiesService';

function newServiceInstance() {
    let http: HttpClientMock;
    const utils = newMockUtilsService();
    return new AdeService(http, utils);
}

describe('ADEService', () => {
    let service: AdeService;

    beforeEach(() => {
        service = newServiceInstance();
    });

    it('should create service', () => expect(service).toBeDefined());

    describe('httpOpenSession method', () => {
        it('should call getOrSetDataFromADE', () => {
            const spyGet = spyOn(service, 'getOrSetDataFromADE').and.callFake(() => {
            });
            service.httpOpenSession();
            expect(spyGet.calls.count()).toEqual(1);
        });
    });
});
