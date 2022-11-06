import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'users-api';

  constructor(private apiService: ApiService) {}

  ngOnInit() {}
}
