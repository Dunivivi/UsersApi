import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../auth/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  userSub: Subscription;
  constructor(private authentificationService: AuthentificationService) {}

  ngOnInit() {
    this.userSub = this.authentificationService.user.subscribe((user) => {
      this.isAuthentificated = !user ? false : true;
      console.log(this.isAuthentificated);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
