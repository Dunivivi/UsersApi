import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '../shared/interfaces/user';
import { ApiService } from '../shared/services/api.service';
import { Faces } from '../shared/services/face';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: IUser | any;
  portret: Faces | any;
  id: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private users: ApiService,
    private face: Faces
  ) {}

  ngOnInit() {
    this.isLoading = true;
    //from string to number
    const id = +this.route.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.portret = this.face.getImgId(+params['id']);
    });
    this.getUser(id);
  }

  getUser(id: number) {
    this.users.getUser(id).subscribe((response) => {
      this.user = response.body;
      console.log(this.user);
      this.isLoading = false;
    });
  }
}
