import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { getCars, getCar, addCar } from "../controller/car.controller";
import { CarAttrs, carParams} from '../models/car.model';

const CarRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get('/cars', {}, async (request, reply) => {
        try {
            const cars = await getCars()
            return reply.code(200).send(cars);
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    });

    server.post<{ Body: CarAttrs }>('/cars', {}, async (request, reply) => {
        try {
            const { body } = request
            const car = await addCar(body)
            return reply.code(201).send(car);
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    } );

    server.get<{ Params: carParams }>('/cars/:id', {}, async (request, reply) => {
        try {
            const { id } = request.params;
            const car = await getCar(id)

            console.log(car)
            if (!car) {
                return reply.code(404).send('not found');
            }
            return reply.code(200).send(car);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send('something went wrong');
        }
    }  );
};

export default fp(CarRoute);