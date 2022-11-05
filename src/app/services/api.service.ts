import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  users: IUser | any;
  usersChanged = new Subject<IUser[]>();

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<IUser>(this.usersUrl + '/users');
  }

  setData(users: IUser[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    this.showData();
    //console.log('2'+this.users);
    return this.users.slice();
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
        //console.log('1' + this.users);
      });
  }
}
