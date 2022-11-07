import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthentificationService } from '../auth/authentification.service';
import { IUser } from '../shared/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: IUser | any;
  // isAuthentificated = false;
  private userSub: Subscription;
  isAuthentificated = false;
  constructor(
    private route: ActivatedRoute,
    private authentificationService: AuthentificationService
  ) {}

  ngOnInit() {
    this.userSub = this.authentificationService.user.subscribe((user) => {
      this.isAuthentificated = !user ? false : true;
      console.log(this.isAuthentificated);
    });
  }

  onLogout() {
    this.authentificationService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
