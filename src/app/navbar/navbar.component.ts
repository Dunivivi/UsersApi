import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../auth/authentification.service';
import { IUser } from '../shared/interfaces/user';
import { NavbarService } from './navbar.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: IUser | any;

  filterTerm = '';

  // isAuthentificated = false;
  private userSub: Subscription;
  isAuthentificated = false;
  constructor(
    private route: ActivatedRoute,
    private authentificationService: AuthentificationService,
    private navbarService: NavbarService
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

  onSearch() {
    this.navbarService.filter.emit(this.filterTerm.toLowerCase());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
