import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NavbarService } from '../navbar/navbar.service';
import { IUser } from '../shared/interfaces/user';
import { ApiService } from '../shared/services/api.service';
import { DataStorageService } from '../shared/services/datastorage.service';
import { Faces } from '../shared/services/face';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IUser | any;
  face: { id: number; url: string }[] | undefined;
  page: number = 1;
  totalItems = 0;
  itemsPerPage = 8;
  predicate!: string;
  ascending!: boolean;
  paginateData: any = [];
  subscription: Subscription;
  filterTerm = '';

  isLoading = false;

  constructor(
    private apiService: ApiService,
    private faces: Faces,
    private dataStorage: DataStorageService,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    // this.apiService.populateDbDocker();
    this.loadPage(1);
    this.face = this.faces.getImg();
    this.navbarService.filter.subscribe((response) => {
      this.filterTerm = response;
    });
  }

  showData() {
    this.apiService.getUsersDocker().subscribe((data) => {
      this.users = data.body;
      console.log(this.users);
      console.log(data);
      this.isLoading = false;
    });
  }

  onUpdate(id: number) {}

  onDelete(id: number) {
    this.apiService.deleteUserById(id).subscribe((response) => {
      console.log(response);
    });
    this.loadPage(1);
  }

  // ==========================Firebase===============
  // getData() {
  //   this.paginateData = this.users.slice(
  //     (this.page - 1) * this.itemsPerPage,
  //     (this.page - 1) * this.itemsPerPage + this.itemsPerPage
  //   );
  // }
  loadPage(page?: number): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.page = pageToLoad;
    this.page = page;
    this.showData();
  }
  // showData() {
  //   this.apiService.getData(this.page, this.itemsPerPage).subscribe((data) => {
  //     this.users = data.body;
  //     console.log(this.users);
  //     this.totalItems = Number(data.headers.get('X-Total-Count'));
  //     this.isLoading = false;
  //     this.dataStorage.storeUsers(this.users);
  //   });
  // }
}
