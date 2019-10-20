import { HttpClient } from '@angular/common/http';
import { StudiesService } from '../src/app/services/studies-services/studies-service';
import { AdeService } from '../src/app/services/studies-services/ade-service';

export class HttpClientMock extends HttpClient {
    constructor() {
        super(null);
    }
}

export class MockStudiesService extends StudiesService {
    constructor(http: HttpClientMock, ade: AdeService) {
        super(http, ade);
    }
}

export function newMockStudiesService() {
    let http: HttpClientMock;
    let ade: AdeService;
    return new MockStudiesService(http, ade);
}
