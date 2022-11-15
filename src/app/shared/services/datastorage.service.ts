import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersComponent } from 'src/app/users/users.component';
import { ApiService } from './api.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  // storeUsers(users) {
  //   return this.http
  //     .put(
  //       'https://users-api-16dc6-default-rtdb.firebaseio.com/users.json',
  //       users
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }
}
