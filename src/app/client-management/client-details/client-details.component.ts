import {Component, OnInit, ViewChild} from '@angular/core';

import {Client} from '../client.model';
import {ClientManagementServiceClient} from '../client-management.service.client';
import {Activity} from '../../activity-management/activity.modle';
import {Page} from '../../shared/model/page.model';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  @ViewChild('form') public clientForm: NgForm;
  client: Client = new Client();
  viewMode = false;
  editMode = false;
  newMode = false;
  activities: Activity[];

  constructor(private router: Router,
              private clientManagementClientService: ClientManagementServiceClient) {
  }

  ngOnInit() {
    console.log(history.state);
    if(history.state.view) {
      this.viewMode = true;
      this.loadClient();

    } else if(history.state.edit) {
      this.editMode = true;
      this.loadClient();
      this.loadActivities();

    } else if(history.state.new) {
      this.newMode = true;
      this.client = new Client();
      this.loadActivities();
    }
  }

  editClient() {
    this.loadActivities();
    this.viewMode = false;
    this.newMode = false;
    this.editMode = true;
  }

  deleteClient() {

  }

  saveClient() {
    this.clientManagementClientService.saveClient(this.client)
        .subscribe(async(result) => {
            await this.router.navigate(['client-management']);

          }, async(err) => {
            let errors = err.errors ? err.errors : JSON.parse(err.message).errors;
            console.log(errors);
            // if(err.errors) {
            for(const error of errors) {
              const control = this.clientForm.form.get(error.field);
              if(control !== null) {
                // control.setErrors(JSON.parse(error.defaultMessage));
                control.setErrors(error.defaultMessage);
                control.markAsDirty();
              }
            }
            // } else if(err.message) {
            //   for(const error of JSON.parse(err.message)) {
            //     const control = this.clientForm.form.get(error.field);
            //     if(control !== null) {
            //       control.setErrors(JSON.parse(error.defaultMessage));
            //       control.markAsDirty();
            //     }
            //   }
            // }
          }
        );
  }

  private loadClient() {
    this.clientManagementClientService.getClient(history.state.data).subscribe((client: Client) => {
      this.client = client;
    });
  }

  private loadActivities() {
    this.clientManagementClientService.getActivitiesPage(0, 1000, '').subscribe((activitiesPage: Page<Activity>) => {
      this.activities = activitiesPage.content;

      if(this.editMode) {
        const currentActivityIndex = this.activities.indexOf(this.client.activity, 0);
        this.activities.splice(currentActivityIndex, 1);
      }
    });
  }
}

