import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
//import { UntypedFormBuilder, Validators } from '@angular/forms';
import { IUser, User } from 'src/app/shared/interfaces/user';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
})
export class UsersAddComponent implements OnInit {
  // editform = this.fb.group({
  //   name: [],
  //   lastName: [],
  //   username: [],
  //   email: [],
  //   phoneNumber: [],
  // });
  constructor(
    private apiService: ApiService //protected fb: UntypedFormBuilder
  ) {}
  ngOnInit() {}

  onSubmit(form: any) {
    // this.apiService.addUserDocker(form.value);
    let user = this.convertFromForm(form);
    console.log('after user');
    this.apiService.createUser(user).subscribe(() => console.log('gata'));
    console.log(form.value);
    // form.reset();
  }

  convertFromForm(form: any): User {
    console.log('during');
    return {
      ...new User(),
      name: form.name,
      username: form.username,
      website: form.website,
      email: form.email,
    };
  }

  onCancel(form: NgForm) {
    form.reset();
  }
}
