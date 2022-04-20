import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

import { Db } from '../models';
import { CarAttrs } from '../models/car.model';

declare module 'fastify' {
    export interface FastifyInstance {
        db: Db;
    }
}

interface carParams {
    id: string;
}

const CarRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/cars', {}, async (request, reply) => {
        try {
            const { Car } = server.db.models;

            const cars = await Car.find({});

            return reply.code(200).send(cars);
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    });

    server.post<{ Body: CarAttrs }>('/cars', {}, async (request, reply) => {
        try {
            const { Car } = server.db.models;

            const car = await Car.addOne(request.body);
            await car.save();
            return reply.code(201).send(car);
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    });

    server.get<{ Params: carParams }>('/cars/:id', {}, async (request, reply) => {
        try {
            const ID = request.params.id;
            const { Car } = server.db.models;
            const car = await Car.findById(ID);

            if (!car) {
                return reply.send(404);
            }

            return reply.code(200).send(car);
        } catch (error) {
            request.log.error(error);
            return reply.send(400);
        }
    });
};

export default fp(CarRoute);