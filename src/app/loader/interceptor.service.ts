import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }

  // This method will be invoked every time http call is detected.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // First set the loader to true so the spinner will be visible.
    this.loaderService.isLoading.next(true);

    // Return the next handle to complete the api cal.
    return next.handle(req).pipe(
      // Check for the completion of the api call to set off the spinner.
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    );
  }
}
