import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class Authentification implements OnInit {
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  isLoading = false;
  isLoginMode = false;
  isAuthentificated = false;
  ngOnInit() {}

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/users']);
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
    // console.log(authForm);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
