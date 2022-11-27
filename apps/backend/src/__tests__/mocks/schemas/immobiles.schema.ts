import { composeMongoose } from 'graphql-compose-mongoose';
import { ImmobileModelTest } from 'apps/backend/src/models/imobille.model';

const customizationOptions = {}

export const immobileTestTC = composeMongoose(ImmobileModelTest, customizationOptions)
