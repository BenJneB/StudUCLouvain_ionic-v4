import { CacheStorageService } from 'ionic-cache/dist/cache-storage';

export class MockCacheStorageService extends CacheStorageService {
    constructor(a, b) { super(a, b); }
    public ready() {
        let promise: Promise<LocalForage>;
        return new Promise<LocalForage>((resolve, reject) => {
            resolve();
        });
    }
}


export class MockCacheService {
    _storage: MockCacheStorageService;
    constructor(_storage) {
    }

    getItem() {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    removeItem() { }
    saveItem() { }
}

export function newMockCacheService() {
    let _storage: MockCacheStorageService;
    return new MockCacheService(_storage);
}
