import { server } from "./app";

const port = process.env.PORT || 7000;

const start = async () => {
    try {
        await server.listen(port);
        console.log('Server started successfully');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();