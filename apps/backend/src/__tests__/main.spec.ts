import { MongoMemoryServer } from 'mongodb-memory-server-core'
import * as mongoose from 'mongoose'
import * as http from 'http'
import * as express from 'express'
import { ObjectId } from 'mongodb';
import { ApolloServer } from 'apollo-server-express'

import { connectDB } from '../main';
import type { IClient } from '../interfaces/client.interface';
import { ClientModelTest } from '../models/client.model';
import { schema } from './mocks/resolvers';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ImmobileModelTest } from '../models/imobille.model';
import { RETRY_TIMES, TIME_OUT } from './utils/constants';

jest.setTimeout(TIME_OUT)
jest.retryTimes(RETRY_TIMES)

let mongod: MongoMemoryServer
let server: ApolloServer

const mockDBName = 'microsistec'

beforeAll(async () => {
	const mongoUri = 'mongodb+srv://usuario_landing_page:8U1oYYR4Zpmzedjz@cluster1.hxn3b67.mongodb.net/?retryWrites=true&w=majority'
	mongod = await MongoMemoryServer.create()
	await connectDB(mongoUri, mockDBName)

	const app = express()
	const httpServer = http.createServer(app)

	server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})
})

async function closeMongoConnection(
	mongod: MongoMemoryServer,
	mongooseConnection: mongoose.Connection
) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, 2000)
		try {
			mongod?.stop().then(async () => {
				await ClientModelTest.collection.drop();
        await ImmobileModelTest.collection.drop();
        mongooseConnection.close().then(() => {
					resolve()
				})
			})
		} catch (err) {
			console.error(err)
		}
	})
}

afterAll(async () => {
	await closeMongoConnection(mongod, mongoose.connection)
	await server.stop()
})

describe('Integration test with apollo server and MongoMemoryServer', () => {
  const mockClient: IClient = {
    name: 'tiago',
    contacts: [{
      type: 'email' as any,
      contact: 'tiago@gmail.com',
    }]
  }

  const mockImmobile = {
    type: "casa" as any,
    address: {
      "street": "rua dos imoveis",
      "city": "sao paulo",
      "state": "sao paulo",
      "zipCode": "123456",
    },
    owners: new ObjectId("6348acd2e1a47ca32e79f46f")
  }

  const publishedImmobile = new ImmobileModelTest(mockImmobile)

  const publishedClient = new ClientModelTest(mockClient)

	it('should show all clients', async () => {
		await publishedClient.save()

		const result = await server.executeOperation({
			query: `
        query Query {
          clientMany {
            name
            contacts {
              type
              contact
            }
            }
          }
			`,
		})

		expect(result.data.clientMany).toHaveLength(1)
		expect(result.data.clientMany[0]).toMatchObject(mockClient)
	})

  it('should show all immobiles', async () => {
		await publishedImmobile.save()

		const result = await server.executeOperation({
			query: `
        query Query {
          immobileMany {
            type
            address {
              street
              city
              state
              zipCode
            }
            owners
          }
        }
			`,
		})

		expect(result.data.immobileMany).toHaveLength(1)
		expect(result.data.immobileMany[0]).toMatchObject(mockImmobile)
	})

  it('should create a client', async () => {
		await server.executeOperation({
			query: `
        mutation Mutation {
          immobileCreateOne {
            record {
              type: 'home'
              address {
                type: email,
                contact: 'tiago@gmail.com'
              }
            }
          }
        }
			`,
		});

    const result = await server.executeOperation({
			query: `
        query Query {
          clientMany {
            name
            contacts {
              type
              contact
            }
            }
          }
			`,
		})

		expect(result.data.clientMany).toHaveLength(1)
		expect(result.data.clientMany[0]).toMatchObject(mockClient)
	})

  it('should create a immobile', async () => {
		await server.executeOperation({
			query: `
        mutation Mutation {
          clientCreateOne {
            record {
              type: 'casa'
              address {
                "street": "rua dos imoveis",
                "city": "sao paulo",
                "state": "sao paulo",
                "zipCode": "123456",
              }
              owners: "tiago"
            }
          }
        }
			`,
		});

    const result = await server.executeOperation({
			query: `
        query Query {
          immobileMany {
            type
            address {
              street
              city
              state
              zipCode
            }
            owners
          }
        }
			`,
		})

		expect(result.data.immobileMany).toHaveLength(1)
		expect(result.data.immobileMany[0]).toMatchObject(mockImmobile)
	})
})
