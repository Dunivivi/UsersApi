import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  users: IUser | any;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<IUser>(this.usersUrl + '/users');
  }

  getUsers() {
    return this.users;
  }

  findUser(id: number) {
    const user = this.users.find((u) => {
      return u.id === id;
    });
    return user;
  }

  showData() {
    this.getData()
      .pipe(map((response: any) => response))
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });
  }
}
