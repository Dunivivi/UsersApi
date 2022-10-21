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
