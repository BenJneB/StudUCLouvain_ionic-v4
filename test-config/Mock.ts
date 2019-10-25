import {
    MissingTranslationHandler,
    TranslateCompiler,
    TranslateLoader,
    TranslateParser,
    TranslateService,
    TranslateStore
} from '@ngx-translate/core';
import { Observable } from 'rxjs';

export function getMockProvider(service, newMockService) {
    return {
        provide: service, useFactory: () => {
            return newMockService();
        }
    };
}

export class MockTranslateService extends TranslateService {
    constructor(
        store: TranslateStore,
        loader: TranslateLoader,
        compiler: TranslateCompiler,
        parser: TranslateParser,
        miss: MissingTranslationHandler
    ) {
        super(store, loader, compiler, parser, miss);
    }

    get(key: string) {
        return new Observable();
    };
}

export function newMockTranslateService() {
    let store: TranslateStore;
    let loader: TranslateLoader;
    let compiler: TranslateCompiler;
    let parser: TranslateParser;
    let miss: MissingTranslationHandler;
    return new MockTranslateService(store, loader, compiler, parser, miss);
}