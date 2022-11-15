import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class NavbarService {
  @Output() filter: EventEmitter<string> = new EventEmitter();

  constructor() {}

  searchInput() {
    return this.filter;
  }
}
