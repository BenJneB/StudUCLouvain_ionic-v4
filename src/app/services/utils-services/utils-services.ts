import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';

@Injectable({
    providedIn: 'root'
  })
  export class UtilsService {

    public convertToJson(data: string): Object {
        let res;

        xml2js.parseString(data, { explicitArray: false }, (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                res = result;
            }
        });
        return res;
    }
  }
