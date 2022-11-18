import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
};

@Injectable()
export class ApiService {
  private usersUrl = 'https://jsonplaceholder.typicode.com';
  private dockerUrl = 'http://localhost:8080';
  users: IUser | any;
  usersChanged = new Subject<IUser[]>();

  constructor(private http: HttpClient) {}

  populateDbDocker(): Observable<any> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    console.log(userData.token);
    return this.http.get(`${this.dockerUrl}/api/faker/populate`, {
      headers: headers,
    });
  }

  getUsersDocker(): Observable<HttpResponse<IUser>> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return this.http.get<IUser>(`${this.dockerUrl}/api/users`, {
      observe: 'response',
      headers: headers,
    });
  }

  getUserById(id: number): Observable<HttpResponse<IUser>> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return this.http.get<IUser>(`${this.dockerUrl}/api/users/${id}`, {
      observe: 'response',
      headers: headers,
    });
  }

  addUserDocker(user: IUser): Observable<any> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return this.http.post(`${this.dockerUrl}/api/users`, user, {
      headers: headers,
    });
  }

  updateUser(user: IUser): Observable<any> {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    console.log(user);
    return this.http.put(`${this.dockerUrl}/api/users`, user, {
      headers: headers,
    });
  }

  deleteUserById(id: number) {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    let headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return this.http.delete<IUser>(`${this.dockerUrl}/api/users/${id}`, {
      observe: 'body',
      headers: headers,
    });
  }

  //==============================Firebase=========================

  getData(page: number, limit: number): Observable<HttpResponse<IUser>> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('_page', page);
    searchParams = searchParams.append('_limit', limit);
    let headers = new HttpHeaders().set('Bearer', '');
    return this.http.get<IUser>(this.usersUrl + '/users', {
      observe: 'response',
      params: searchParams,
      headers: headers,
    });
  }

  getUsers() {
    // this.showData();
    //console.log('2'+this.users);
    return this.users.slice();
  }

  getUser(id: number): Observable<HttpResponse<IUser>> {
    return this.http.get<IUser>(this.usersUrl + '/users/' + id, {
      observe: 'response',
    });
  }

  postData(users: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.usersUrl + '/users', users, httpOptions);
  }

  setData(users: IUser[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  findUser(id: number) {
    const user = this.users.find((u) => {
      return u.id === id;
    });
    return user;
  }
}
