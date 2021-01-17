import 'reflect-metadata';
import dotenv from 'dotenv';
import { loadControllers } from './lib/dyn-loader';
import { Server } from './server';

dotenv.config({
    path: '.env'
});

export const server = new Server();

Promise.all([loadControllers(), server.createConnection()])
    .then((values) => {

        
        values[0].forEach((c) => {
            server.router.use(c.route, c.instance);
        });
        

        server.setup((app) => {
            app.use('', server.router);
        });    

        server.listen();

    }, error => {
        console.error(error);
    });