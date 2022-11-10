import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
})
export class UsersAddComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.apiService.postData(form.value);
    console.log(form.value);
    // form.reset();
  }

  onCancel(form: NgForm) {
    form.reset();
  }
}
