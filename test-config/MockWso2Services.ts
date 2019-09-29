import { UserService } from 'src/app/services/utils-services/user-service';
import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';

import { HttpClient } from '@angular/common/http';

import { Wso2Service } from '../src/app/services/wso2-services/wso2-service';
import { MockConnectivityService } from './MockUtilsService';

export class HttpClientMock extends HttpClient {
    constructor() {
        super(null);
    }
}

export class MockWso2Service extends Wso2Service {
    constructor(http: HttpClientMock) {
        super(http);
    }
}

export class MockRepertoireService extends RepertoireService {
    constructor(
        http: HttpClientMock,
        wso2: MockWso2Service,
        conn: MockConnectivityService) {
        super(http, wso2, conn);
    }

    searchEmployees() {
        return new Promise((resolve, reject) => {

        });
    }
}

export function newMockRepertoireService() {
    let http: HttpClientMock;
    let wso2: MockWso2Service;
    let conn: MockConnectivityService;
    return new MockRepertoireService(http, wso2, conn);
}

export class MockLibrariesService extends LibrariesService {
    constructor(
        http: HttpClientMock,
        wso2: MockWso2Service,
        conn: MockConnectivityService) {
        super(http, wso2, conn);
    }

    loadLibraries() {
        return new Promise((resolve, reject) => {

        });
    }
}

export function newMockLibrariesService() {
    let http: HttpClientMock;
    let wso2: MockWso2Service;
    let conn: MockConnectivityService;
    return new MockLibrariesService(http, wso2, conn);
}
