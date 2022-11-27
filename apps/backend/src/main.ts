import { ApolloError, ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from 'express';
import * as http from 'http';
import { schema } from './app/graphql/resolvers';
import mongoose from 'mongoose';

const mongodbURI = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

const port = process.env.PORT || 8080;

export const connectDB = async (mongodbURI: string, dbName: string) => {
  if (!mongodbURI || !dbName) {
    return Promise.reject('MongoDB URI or DB Name is not defined');
  }
  try {
    mongoose.connect(
      mongodbURI,
      { autoIndex: false, dbName },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
    console.log('mongodb database started');
    console.log(`dbURL: `, mongodbURI);
    console.log(`dbName: `, dbName);
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

async function startApolloServer() {
  try {
    await connectDB(mongodbURI, dbName);

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      schema,
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise<void>((resolve) =>
      httpServer.listen({ port }, resolve)
    );

    console.log(
      `Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  } catch (err) {
    throw new ApolloError('Something went wrong in Apollo');
  }
}

const server = startApolloServer();

export default server;


// mongodb+srv://cluster0.murrqem.mongodb.net/microsistec
