import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard } from '../auth/auth-guard';
import { AuthentificationService } from '../auth/authentification.service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  userSub: Subscription;
  constructor(
    private authentificationService: AuthentificationService,
    private apiService: ApiService,
    private route: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authentificationService.user.subscribe((user) => {
      this.isAuthentificated = !user ? false : true;
      console.log(this.isAuthentificated);
    });
  }

  onLoad() {
    this.userSub = this.authentificationService.user.subscribe((user) => {
      this.isAuthentificated = !user ? false : true;
      console.log(this.isAuthentificated);
    });
    if (this.isAuthentificated) {
      this.apiService.populateDbDocker().subscribe(() => {
        this.route.navigate(['/users']);
      });
    } else {
      window.alert('You must be logged in !');
    }
    return this.isAuthentificated;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
