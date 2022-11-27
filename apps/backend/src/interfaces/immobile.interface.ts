import { Document } from 'mongoose';
import { IClient } from './client.interface';

enum TypeOptions {
  casa,
  apartamento
}

export interface IAddress {
  street: string,
  city: string,
  state: string,
  zipCode: string
}

export interface IImmobile {
  type: TypeOptions,
  address: IAddress,
  owners: IClient[],
}

export interface IImmobileDocument extends IImmobile, Document {}
