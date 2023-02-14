import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, timeout } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }
  
  //This method will be invoked every time http call is detected.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //First set the loader to true so the spinner will be visible.
    this.loaderService.showLoader();

    //Return the next handle to complete the api cal.
    return next.handle(req).pipe(
      //When the api call is completed => set off the spinner.
      finalize(
        () => this.loaderService.hideLoader()
      ));
  }

}
