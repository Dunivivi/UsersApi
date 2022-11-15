import { Injectable } from '@angular/core';
import { IAddress } from './address';
import { ICompany } from './company';

export interface IUser {
  id: number;
  name: string;
  username: string;
  website: string;
  phone: string;
  email: string;
  address: IAddress;
  company: ICompany;
}

export class User {
  constructor(
    public id?: number,
    public name?: string,
    public username?: string,
    public website?: string,
    public phone?: string,
    public email?: string,
    public address?: IAddress,
    public company?: ICompany
  ) {}
}
