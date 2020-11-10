import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ClientListComponent} from './client-management/client-list/client-list.component';
import {ClientDetailsComponent} from './client-management/client-details/client-details.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'client-management', component: ClientListComponent},
  {path: 'client-management/client-details', component: ClientDetailsComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
