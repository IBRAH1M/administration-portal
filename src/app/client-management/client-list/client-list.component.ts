import {AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';

import {Client} from '../client.model';
import {ClientManagementService} from '../client-management.service';
import {Page} from '../../shared/model/page.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;
  dataLoading = new BehaviorSubject<boolean>(true);
  clientsPage: Page<Client>;

  constructor(@Inject(LOCALE_ID) public localeId: string,
              // public dialog: MatDialog,
              private clientManagementClientService: ClientManagementService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(250),
      distinctUntilChanged()
    )
    .subscribe(() => {
      console.log(this.input?.nativeElement.value);
      this.loadData(0, this.clientsPage.size, '', this.input?.nativeElement.value);
    });
  }

  loadData(pageNumber = 0, pageSize = 25, pageSort = 'id,desc', pageFilter = '') {
    this.dataLoading.next(true);
    this.clientManagementClientService.getClientsPage(pageNumber, pageSize, pageSort, pageFilter)
        .pipe(
          catchError(() => of([])),
          finalize(() => this.dataLoading.next(false))
        )
        .subscribe((data: Page<Client>) => {
          this.clientsPage = data;
        });
  }

  // openDeleteDialog() {
  //   const dialogRef = this.dialog.open(ConfirmationComponent, {
  //     data: {
  //       title: 'Are you sure you want to delete the client?',
  //       content: 'This will delete all elements that are currently on this page and cannot be undone'
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
