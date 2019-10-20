import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';

import { HttpClient } from '@angular/common/http';

import { Wso2Service } from '../src/app/services/wso2-services/wso2-service';
import { MockConnectivityService } from './MockUtilsService';
import { Observable } from 'rxjs';
import { StudentService } from '../src/app/services/wso2-services/student-service';

export class HttpClientMock extends HttpClient {
    constructor() {
        super(null);
    }
}

export class MockWso2Service extends Wso2Service {
    constructor(http: HttpClientMock) {
        super(http);
    }

    getAppToken() {
        return new Observable<string>(() => {});
    }

    getToken() {
        return new Observable<string>(() => {});
    }
}

export function newMockWso2Service() {
    let http: HttpClientMock;
    return new MockWso2Service(http);
}

export class MockRepertoireService extends RepertoireService {
    constructor(
        http: HttpClientMock,
        wso2: MockWso2Service,
        conn: MockConnectivityService) {
        super(http, wso2, conn);
    }

    searchEmployees() {
        return new Promise(() => {});
    }

    loadEmpDetails() {
        return new Promise(() => {});
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

    loadLibDetails() {
        return new Promise(() => {});
    }
}

export function newMockLibrariesService() {
    let http: HttpClientMock;
    let wso2: MockWso2Service;
    let conn: MockConnectivityService;
    return new MockLibrariesService(http, wso2, conn);
}

export class MockStudentService extends StudentService {
    constructor(
        http: HttpClientMock,
        wso2: MockWso2Service,
        ) {
        super(http, wso2);
    }

    searchActivities() {
        return new Promise(() => {});
    }
}

export function newMockStudentService() {
    let http: HttpClientMock;
    let wso2: MockWso2Service;
    return new MockStudentService(http, wso2);
}