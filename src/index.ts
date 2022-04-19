import { fastify } from 'fastify';
const server = fastify({
    logger: true
});

const start = async () => {
    try {
        await server.listen(7000);
        console.log('Server started successfully');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();