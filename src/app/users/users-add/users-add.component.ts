import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { IUser, User } from 'src/app/shared/interfaces/user';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
})
export class UsersAddComponent implements OnInit {
  user: IUser | any;
  @ViewChild('addUser') addUser: NgForm;
  isUpdating = false;
  id: number;
  name = '';
  username = '';
  email = '';
  phoneNumber = '';
  webSite = '';
  street = '';
  suite = '';
  city = '';
  zipcode = '';
  companyName = '';
  bs = '';
  catchPhrase = '';
  lat = '';
  lng = '';

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router //protected fb: UntypedFormBuilder
  ) {}
  ngOnInit() {
    this.activatedRoute.snapshot.routeConfig.path == 'users/update/:name/:id'
      ? (this.isUpdating = true)
      : (this.isUpdating = false);
    const id = +this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.initForm();
  }

  initForm() {
    if (this.isUpdating) {
      const updatingUser = this.apiService
        .getUserById(this.id)
        .subscribe((data) => {
          this.name = data.body.name;
          this.username = data.body.username;
          this.email = data.body.email;
          this.phoneNumber = data.body.phone;
          this.webSite = data.body.website;
          this.street = data.body.address.street;
          this.suite = data.body.address.suite;
          this.city = data.body.address.city;
          this.zipcode = data.body.address.zipcode;
          this.companyName = data.body.company.name;
          this.bs = data.body.company.bs;
          this.catchPhrase = data.body.company.catchPhrase;
          this.lat = data.body.address.geo.lat;
          this.lng = data.body.address.geo.lng;
          this.id = data.body.id;
          console.log(data.body);
        });
    }
  }

  covertFromForm(form: any): IUser {
    return {
      ...new User(),
      id: this.id,
      name: form.value.userData.name,
      email: form.value.userData.email,
      phone: form.value.userData.phoneNumber,
      username: form.value.userData.username,
      website: form.value.userData.webSite,
      address: form.value.userAddress,
      company: form.value.userCompany,
    };
  }

  onSubmit(form: any) {
    if (this.isUpdating) {
      this.apiService
        .updateUser(this.covertFromForm(form))
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      this.apiService
        .addUserDocker(this.covertFromForm(form))
        .subscribe((response) => {
          console.log(response);
        });
    }
    console.log(form.value);
    form.reset();
    this.router.navigate(['/users']);
    setTimeout(() => {
      location.reload();
    }, 50);
  }

  onCancel(form: NgForm) {
    this.router.navigate(['/users']);
    form.reset();
  }
}
