import { Schema, Document, model, Model } from 'mongoose';

export interface carParams {
    id: string;
}

export interface CarAttrs {
    title: string;
    brand: string;
    price: string;
    age:  number;
}

export interface CarModel extends Model<CarDocument> {
    addOne(doc: CarAttrs): CarDocument;
}

export interface CarDocument extends Document {
    title: string;
    brand: string;
    price: string;
    age:  number;
    createdAt: string;
    updatedAt: string;
}

export const carSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

carSchema.statics.addOne = (doc: CarAttrs) => {
    return new Car(doc);
};

export const Car = model<CarDocument, CarModel>('Car', carSchema);