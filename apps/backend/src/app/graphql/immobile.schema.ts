import { composeMongoose } from 'graphql-compose-mongoose';
import { ImmobileModel } from '../../models/imobille.model';

const customizationOptions = {}

export const immobileTC = composeMongoose(ImmobileModel, customizationOptions)
