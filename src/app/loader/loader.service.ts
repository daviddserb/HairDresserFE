import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  // The material spinner will be displayed based its value. If it is true, loading spinner will be shown.
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }
}
