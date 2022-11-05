import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../interfaces/user';
import { ApiService } from '../services/api.service';
import { Faces } from '../services/face';
import { UserComponent } from '../user/user.component';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser | any;
  face: { id: number; url: string }[] | undefined;
  page: number = 1;
  totalItems = 0;
  itemsPerPage = 8;
  predicate!: string;
  ascending!: boolean;
  paginateData: any = [];
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private faces: Faces,
    private selectedUser: UserComponent,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.apiService.usersChanged.subscribe(
      (users: IUser[]) => {
        this.users = users;
      }
    );
    //console.log(this.users)
    //this.showData();
    //console.log(this.users)
    //this.totalItems = Object.keys(this.users).length;
    //this.getData();
    // this.showData();
    this.loadPage(1);
    this.face = this.faces.getImg();
    console.log(this.totalItems);
    // localStorage.setItem('usersData', this.users);
    // this.users = localStorage.getItem('userData');
  }

  getData() {
    this.paginateData = this.users.slice(
      (this.page - 1) * this.itemsPerPage,
      (this.page - 1) * this.itemsPerPage + this.itemsPerPage
    );
  }
  loadPage(page?: number): void{
    const pageToLoad: number = page ?? this.page ?? 1;
    this.page = pageToLoad;
    this.page = page;
    this.showData();
  }
  showData() {
    this.apiService.getData()
      .pipe(map((response: any) => response))
      .subscribe((data) => {
        this.users = data;
        this.totalItems = this.users.length;
        this.paginateData = this.users.slice(
          (this.page - 1) * this.itemsPerPage,
          (this.page - 1) * this.itemsPerPage + this.itemsPerPage);
        //console.log('1' + this.users);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // showData() {
  //   this.apiService
  //     .getData()
  //     .pipe(map((response: any) => response))
  //     .subscribe((data) => {
  //       this.users = data;
  //       console.log(this.users);
  //     });
  // }
}
