import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class Authentification implements OnInit {
  isLoading = false;
  isLoginMode = false;
  ngOnInit() {}

  onSubmit(authForm: NgForm) {
    console.log(authForm);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
