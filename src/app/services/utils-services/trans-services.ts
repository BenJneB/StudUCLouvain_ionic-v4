import { resolve } from 'url';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
  })
  export class TransService {
      trans: string;
    constructor(
        private translateService: TranslateService,
    ) {

    }

    getTranslation(key: string): string {
        return this.translateService.instant(key);
    }
  }
