import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '../interfaces/user';
import { ApiService } from '../services/api.service';
import { Faces } from '../services/face';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: IUser | any;
  portret: Faces | any;

  constructor(
    private route: ActivatedRoute,
    private users: ApiService,
    private face: Faces
  ) {}

  ngOnInit() {
    //from string to number
    const id = +this.route.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.user = this.users.findUser(+params['id']);
      this.portret = this.face.getImgId(+params['id']);
    });
  }
}
