import { schemaComposer } from 'graphql-compose';

import { ClientModel } from 'apps/backend/src/models/client.model';
import { ImmobileModel } from 'apps/backend/src/models/imobille.model';
// import { CreateOneResolverOpts } from 'graphql-compose-mongoose';
import { clientTC } from '../client.schema';
import { immobileTC } from '../immobile.schema';

schemaComposer.Query.addFields({
  // client
  clientOne: clientTC.mongooseResolvers.findOne(),
  clientMany: clientTC.mongooseResolvers.findMany(),
  clientCount: clientTC.mongooseResolvers.count(),
  // immobile
  immobileOne: {
    type: immobileTC,
    args: { filter: 'FilterFindOneImmobileInput' },
    resolve: async (_source, args) => {
      const { address } = args.filter;
      const { street } = address;
      const findImmobile = await ImmobileModel.findOne({ 'adress.street': street });
      return findImmobile;
    }
  },
  immobileMany: immobileTC.mongooseResolvers.findMany(),
  immobileCount: immobileTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
  // client
  clientCreateOne: {
    type: clientTC,
    args: { record: 'UpdateOneClientInput' },
    resolve: async (source, args) => {
      const { name } = args.record;
      const findClient = await ClientModel.findOne({ name });
      if (findClient) {
        return args.record;
      }
      const createClient = await ClientModel.create(args.record)
      return createClient;
    }
  },
  clientUpdateOne: clientTC.mongooseResolvers.updateOne(),
  clientUpdateMany: clientTC.mongooseResolvers.updateMany(),
  clientRemoveOne: clientTC.mongooseResolvers.removeOne(),
  // immobile
  immobileCreateOne: {
    type: immobileTC,
    args: { record: 'UpdateOneImmobileInput' },
    resolve: async (source, args) => {
      const { address, owners } = args.record;
      const { street } = address;
      const findClient = await ClientModel.findOne({ name: owners });
      const findImmobile = await ImmobileModel.findOne({ 'address.street': street });
      if (findImmobile) {
        return args.record;
      }
      const createImmobile = await ImmobileModel.create({
        ...args.record,
        owners: findClient
      })
      return createImmobile;
    }
  },
  immobileUpdateOne: immobileTC.mongooseResolvers.updateOne(),
  immobileUpdateMany: immobileTC.mongooseResolvers.updateMany(),
  immobileRemoveOne: immobileTC.mongooseResolvers.removeOne(),
})

export const schema = schemaComposer.buildSchema()
