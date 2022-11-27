import { composeMongoose } from 'graphql-compose-mongoose'
import { ClientModel } from '../../models/client.model';

const customizationOptions = {}

export const clientTC = composeMongoose(ClientModel, customizationOptions)
