import { fastify } from 'fastify';
import db from '../models';
import carRoutes from '../routes/car.route';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';

export const server = fastify({
    logger: true
});

// Activate plugins below:
server.register(db, { uri });
server.register(carRoutes);
