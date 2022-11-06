import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  users: IUser | any;
  usersChanged = new Subject<IUser[]>();

  constructor(private http: HttpClient) {}

  getData(page: number, limit: number): Observable<HttpResponse<IUser>> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('_page', page);
    searchParams = searchParams.append('_limit', limit);

    return this.http.get<IUser>(this.usersUrl + '/users', {
      observe: 'response',
      params: searchParams,
    });
  }

  getUser(id: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(this.usersUrl + '/users/' + id, {
      observe: 'response',
    });
  }

  setData(users: IUser[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    // this.showData();
    //console.log('2'+this.users);
    return this.users.slice();
  }

  findUser(id: number) {
    const user = this.users.find((u) => {
      return u.id === id;
    });
    return user;
  }
}
