import { schemaComposer } from 'graphql-compose';

import { ClientModel } from 'apps/backend/src/models/client.model';
import { ImmobileModel } from 'apps/backend/src/models/imobille.model';
// import { CreateOneResolverOpts } from 'graphql-compose-mongoose';
import { clientTestTC } from '../schemas/client.schema';
import { immobileTestTC } from '../schemas/immobiles.schema';

schemaComposer.Query.addFields({
  // client
  clientOne: clientTestTC.mongooseResolvers.findOne(),
  clientMany: clientTestTC.mongooseResolvers.findMany(),
  clientCount: clientTestTC.mongooseResolvers.count(),
  // immobile
  immobileOne: {
    type: immobileTestTC,
    args: { filter: 'FilterFindOneImmobileInput' },
    resolve: async (_source, args) => {
      const { address } = args.filter;
      const { street } = address;
      const findImmobile = await ImmobileModel.findOne({ 'adress.street': street });
      return findImmobile;
    }
  },
  immobileMany: immobileTestTC.mongooseResolvers.findMany(),
  immobileCount: immobileTestTC.mongooseResolvers.count(),
})

schemaComposer.Mutation.addFields({
  // client
  clientCreateOne: {
    type: clientTestTC,
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
  clientUpdateOne: clientTestTC.mongooseResolvers.updateOne(),
  clientUpdateMany: clientTestTC.mongooseResolvers.updateMany(),
  clientRemoveOne: clientTestTC.mongooseResolvers.removeOne(),
  // immobile
  immobileCreateOne: {
    type: immobileTestTC,
    args: { record: 'UpdateOneImmobileInput' },
    resolve: async (source, args) => {
      const { address, owners } = args.record;
      const { street } = address;
      // const findClient = await ClientModel.findOne({ name: owners });
      const findImmobile = await ImmobileModel.findOne({ 'address.street': street });
      if (findImmobile) {
        return args.record;
      }
      const createImmobile = await ImmobileModel.create({
        ...args.record,
        owners: owners
      })
      return createImmobile;
    }
  },
  immobileUpdateOne: immobileTestTC.mongooseResolvers.updateOne(),
  immobileUpdateMany: immobileTestTC.mongooseResolvers.updateMany(),
  immobileRemoveOne: immobileTestTC.mongooseResolvers.removeOne(),
})

export const schema = schemaComposer.buildSchema()
