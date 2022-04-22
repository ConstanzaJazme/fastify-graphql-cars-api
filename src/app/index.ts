import Fastify from 'fastify';
import db from '../models';
import carRoutes from '../routes/car.route';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';

const app = Fastify({
    logger: true
});

// Activate plugins below:
app.register(db, { uri });
app.register(carRoutes);

export default app