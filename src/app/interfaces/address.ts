import { IGeo } from './geo';

export interface IAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geoId: IGeo;
}
