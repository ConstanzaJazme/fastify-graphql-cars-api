import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { getCars, getCar, addCar } from "../controller/car.controller";
import { CarAttrs, carParams } from '../models/car.model';


const CarRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/cars', {}, async (request, reply) =>
        await getCars(request,reply)
    );

    server.post<{ Body: CarAttrs }>('/cars', {}, async (request, reply) =>
        await addCar(request,reply)
    );

    server.get<{ Params: carParams }>('/cars/:id', {}, async (request, reply) =>
        await getCar(request,reply)
    );
};

export default fp(CarRoute);