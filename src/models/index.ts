import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';
import { Car, CarModel } from './car.model';

export interface Models {
    Car: CarModel;
}

export interface Db {
    models: Models;
}

export interface MyPluginOptions {
    uri: string;
}

const ConnectDB: FastifyPluginAsync<MyPluginOptions> = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
    try {
        mongoose.connection.on('connected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'connected');
        });

        mongoose.connection.on('disconnected', () => {
            fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
        });

        const db = await mongoose.connect(options.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions );

        const models: Models = { Car };

        fastify.decorate('db', { models });
    } catch (error) {
        console.error(error);
    }
};

export default fp(ConnectDB);