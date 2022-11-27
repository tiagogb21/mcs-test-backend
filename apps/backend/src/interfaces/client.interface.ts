import { Document } from 'mongoose';

enum TypeOptions {
  telefone,
  email
}

export interface IContact {
  type: TypeOptions,
  contact: string,
}

export interface IClient {
  name: string,
  contacts: IContact[],
}

export interface IClientDocument extends IClient, Document {}
