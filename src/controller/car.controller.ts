import { Car, CarAttrs } from "../models/car.model";

export const getCars = async () => await Car.find({})

export const addCar = async (body: CarAttrs) => {
        const car = await Car.addOne(body);
        await car.save();
        return car
}

export const getCar = async (id: String) => await Car.findById(id)