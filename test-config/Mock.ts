import {
    MissingTranslationHandler,
    TranslateCompiler,
    TranslateLoader,
    TranslateParser,
    TranslateService,
    TranslateStore
} from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { UrlSerializer, UrlTree } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { NgZone } from '@angular/core';
import { LatLngExpression, Marker, Popup } from 'leaflet';

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
    }
}

export function newMockTranslateService() {
    let store: TranslateStore;
    let loader: TranslateLoader;
    let compiler: TranslateCompiler;
    let parser: TranslateParser;
    let miss: MissingTranslationHandler;
    return new MockTranslateService(store, loader, compiler, parser, miss);
}

export class MockNavController extends NavController {
    constructor(
        platform: Platform,
        location: Location,
        urlSerializer: UrlSerializer
    ) {
        super(platform, location, urlSerializer);
    }

    navigateForward(url: string | UrlTree | any[], options?: NavigationOptions): Promise<boolean> {
        return new Promise(() => {
        });
    }
}

export function newMockNavController() {
    const platform = new Platform('', new NgZone({}));
    let loc: Location, urlS: UrlSerializer;
    return new MockNavController(platform, loc, urlS);
}

export class LeafletMarkerMock extends Marker {
    constructor() {
        super({lat: 0.0, lng: 0.0});
    }

    getPopup() {
        return new Popup();
    }

    setLatLng(a: LatLngExpression) {
        return this;
    }
}

export class LeafletMapMock {
    fire() {
    }

    on() {
    }

    addLayer() {
    }
}
