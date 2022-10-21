import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  users: IUser | undefined;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<IUser>(this.usersUrl + '/users');
  }

  // showData() {
  //   this.getData().subscribe((data) => {
  //     this.users = { ...data };
  //     console.log(this.users);
  //   });
  // }

  //   showData() {
  //     this.getData().subscribe(
  //       (data) =>
  //         (this.config = {
  //           name: data.name,
  //           id: data.id,
  //           username: data.username,
  //           website: data.website,
  //           phone: data.phone,
  //           email: data.email,
  //           address: data.address,
  //           company: data.company,
  //         })
  //     );
  //     console.log(this.config);
  //   }
}
