import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthorityModel} from '../model/authority.model';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from '../service/authentication.service';

@Directive({
  selector: '[appHasAccess]'
})
export class HasAccessDirective implements OnInit, OnDestroy {
  @Input('appHasAccess') neededAccessAuthorities: string[];
  private authorities$: AuthorityModel[];
  private storagePrefix = environment.storage_prefix;

  constructor(private authenticationService: AuthenticationService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    // if(sessionStorage.getItem) {
    //   this.authorities$ = JSON.parse(sessionStorage.getItem(`${this.storagePrefix}authorities`));
    //   this.checkAccess();
    //
    // }
    const authorities = localStorage.getItem(`${this.storagePrefix}authorities`);
    if (authorities) {
      this.authorities$ = JSON.parse(authorities);
      this.checkAccess();

    } else {
      this.authenticationService.initSession();
    }
  }

  checkAccess(): void {
    this.neededAccessAuthorities.every((accessAuthority: string) => {
      const foundMatch = this.authorities$.find(authority => authority.authority.toUpperCase() === accessAuthority.toUpperCase());
      if (foundMatch) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        return;

      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.authorities$ = [];
  }
}
