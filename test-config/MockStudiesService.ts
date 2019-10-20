import { HttpClient } from '@angular/common/http';
import { StudiesService } from '../src/app/services/studies-services/studies-service';
import { AdeService } from '../src/app/services/studies-services/ade-service';
import { MockUtilsService } from './MockUtilsService';
import { Observable } from 'rxjs';

export class HttpClientMock extends HttpClient {
    constructor() {
        super(null);
    }
}

export class MockStudiesService extends StudiesService {
    constructor(http: HttpClientMock, ade: MockAdeService) {
        super(http, ade);
    }
}

export function newMockStudiesService() {
    let http: HttpClientMock;
    let ade: MockAdeService;
    return new MockStudiesService(http, ade);
}

export class MockAdeService extends AdeService {
    constructor(http: HttpClientMock, utils: MockUtilsService) {
        super(http, utils);
    }

    getProjects() {
        return new Observable(() => {});
    }
}

export function newMockAdeServicee() {
    let http: HttpClientMock;
    let utils: MockUtilsService;
    return new MockAdeService(http, utils);
}