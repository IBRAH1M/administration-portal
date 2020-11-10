import {NgModule} from '@angular/core';

// import {MaterialModule} from './material/material.module';
import {ThemeChangeService} from './service/theme-change.service';
import {SharedRoutingModule} from './shared-routing.module';
import {AuthenticationService} from './service/authentication.service';
import {HasAccessDirective} from './directive/has-access.directive';
import {ConfirmationComponent} from './component/confirmation.component';
import {httpInterceptorProviders} from './interceptor';

@NgModule({
  declarations: [
    HasAccessDirective,
    ConfirmationComponent
  ],
  exports: [
    HasAccessDirective,
    ConfirmationComponent
  ],
  imports: [
    SharedRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthenticationService,
    ThemeChangeService
  ]
})
export class SharedModule {
}
