export class MockCacheStorageService {
    constructor(a, b) { }
    public ready() {
        return true;
    }
}
export class StorageMock {
    public saveItem() {
        return new Promise((resolve, reject) => {
        });
    }
    public getItem() {
        return new Promise((resolve, reject) => {
        });
    }
    public removeItem() {
        return new Promise((resolve, reject) => {
        });
    }
}
