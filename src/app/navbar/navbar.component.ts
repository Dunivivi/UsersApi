import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { AuthentificationService } from '../auth/authentification.service';
import { IUser } from '../shared/interfaces/user';
import { NavbarService } from './navbar.service';

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
