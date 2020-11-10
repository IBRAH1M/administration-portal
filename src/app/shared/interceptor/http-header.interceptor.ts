import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../service/authentication.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  private storagePrefix: string = environment.storage_prefix;

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.isAuthenticated.getValue()) {
      const tokenType = localStorage.getItem(`${this.storagePrefix}token_type`);
      const accessToken = localStorage.getItem(`${this.storagePrefix}access_token`);
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          // 'Authorization': `${tokenType} ${accessToken}`
          'Authorization': `bearer 40a7fe25-e84d-4db3-97bb-123610140604`
        }
      });
    }
    return next.handle(request);
  }
}
