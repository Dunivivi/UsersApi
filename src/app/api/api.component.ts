import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'],
})
export class ApiComponent implements OnInit {
  apiUsers: any = [];

  constructor(private apiService: ApiService, private fdmfd: UserComponent) {}

  ngOnInit() {
    // this.fdmfd.getUsers();
    // this.apiService.getData().subscribe((res) => {
    //   [this.apiUsers] = [res];
    //   // console.log(Object.entries(this.users));
    //   console.log(this.apiUsers);
    // });
    this.apiService.getData();
    // this.apiService.showData();

    // this.fdmfd.getUsers();
  }

  // ngAfterContentInit() {
  //   this.apiService.showData();
  // }
}
