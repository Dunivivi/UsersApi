import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './auth/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Jquery Integration With Angular!';
  isJqueryWorking: any;
  title = 'users-api';

  constructor(private authService: AuthentificationService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
