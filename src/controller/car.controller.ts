import { FastifyReply, FastifyRequest } from 'fastify';
import { Car, CarAttrs, carParams } from "../models/car.model";

export const getCars = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const cars = await Car.find({});
        return reply.code(200).send(cars);
    } catch (error) {
        request.log.error(error);
        return reply.send(500);
    }
}

export const addCar = async (request: FastifyRequest<{Body: CarAttrs}>, reply: FastifyReply) => {
    try {
        const car = await Car.addOne(request.body);
        await car.save();
        return reply.code(201).send(car);
    } catch (error) {
        request.log.error(error);
        return reply.send(500);
    }
}

export const getCar = async (request: FastifyRequest<{ Params: carParams }>, reply: FastifyReply) => {
    try {
        const { id } = request.params;
        const car = await Car.findById(id);

        if (!car) {
            return reply.send(404);
        }

        return reply.code(200).send(car);
    } catch (error) {
        request.log.error(error);
        return reply.send(400);
    }
}