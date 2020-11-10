import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  hideSideNav = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => this.hideSideNav = true),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSideNav(): void {
      this.hideSideNav = !this.hideSideNav;
  }
}
