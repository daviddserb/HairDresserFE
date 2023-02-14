import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  //Subject is an RxJS Observable which can have multiple subscribers.
  //BehaviorSubject is a Subject which stores the current value.
  //The material spinner will be displayed based its value. If it is true, loading spinner will be shown.
  //public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public appLoader = new Subject<boolean>();

  constructor() {}

  showLoader() {
    this.appLoader.next(true);
  }

  hideLoader() {
    this.appLoader.next(false);
  }
}