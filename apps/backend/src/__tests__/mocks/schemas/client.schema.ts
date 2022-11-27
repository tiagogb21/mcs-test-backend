import { composeMongoose } from 'graphql-compose-mongoose'
import { ClientModelTest } from 'apps/backend/src/models/client.model';

const customizationOptions = {}

export const clientTestTC = composeMongoose(ClientModelTest, customizationOptions)
