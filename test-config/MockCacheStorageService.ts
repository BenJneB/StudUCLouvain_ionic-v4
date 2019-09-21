import { Storage, StorageConfig } from '@ionic/storage';

export class MockCacheStorageService {
    constructor(a, b) { }
    public ready() {
        return true;
    }
}
export class StorageMock extends Storage {
    constructor(config: StorageConfig) {
        super(config);
    }
    saveItem() {
        return new Promise((resolve, reject) => {
        });
    }
    getItem(key: string) {
        return '';
    }
    removeItem(key: string) {
        return new Promise((resolve, reject) => {
        });
    }
    remove(key: string) {
        return new Promise((resolve, reject) => {
        });
    }
    set(key: string, value: any) {
        return new Promise((resolve, reject) => {
        });
    }
}
