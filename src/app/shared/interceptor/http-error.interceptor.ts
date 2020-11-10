import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';
import {NotificationService} from '../service/notification.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private route: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
               .pipe(catchError(err => {
                 if (err.status === 401) {
                   // auto logout if 401 response returned from api
                   this.authenticationService.logout();
                   this.route.navigate(['']); // TODO is this needed the redirect should happen by auth guard?!

                 } else if (err.status === 403) {

                 } else if (err.status === 500) {

                 }

                 return throwError(err.error);
               }));
  }
}
