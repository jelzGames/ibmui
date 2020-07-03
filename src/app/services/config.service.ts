import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    BASE_URL = 'https://democore.eu-gb.mybluemix.net/';
    BASE_SIGNALR = this.BASE_URL + "notify";
}
