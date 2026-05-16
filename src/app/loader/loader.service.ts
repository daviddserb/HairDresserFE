import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public appLoader = new Subject<boolean>();

    constructor() {}

    showLoader() {
        this.appLoader.next(true);
    }

    hideLoader() {
        this.appLoader.next(false);
    }
}