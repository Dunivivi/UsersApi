import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { Faces } from '../services/face';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IUser | any;
  face: { id: number; url: string }[] | undefined;

  constructor(private apiService: ApiService, private faces: Faces) {}

  ngOnInit() {
    this.showData();
    this.face = this.faces.getImg();
  }

  showData() {
    this.apiService
      .getData()
      .pipe(map((response: any) => response))
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });
  }

  copyData() {}
}
