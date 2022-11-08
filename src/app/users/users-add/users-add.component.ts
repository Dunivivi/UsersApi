import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
})
export class UsersAddComponent implements OnInit {
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onCancel(form: NgForm) {
    form.reset();
  }
}
