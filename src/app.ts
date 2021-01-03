import 'reflect-metadata';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';
import express, { Request, Response, NextFunction, Router } from 'express';
import ErrorHandler from './lib/models/errorhandler';
import { loadControllers } from './lib/dyn.loader';
import { getConnectionOptions } from 'typeorm';
import { Server } from './server';
import { log } from './lib/util';

dotenv.config({
    path: '.env'
});

export const server = new Server();

Promise.all([loadControllers(), server.createConnection()])
    .then((values) => {

        values[0].forEach((c) => {
            server.router.use(c.route, c.instance);
        });

        server.app.use('/api', server.router);

        server.app.get('/favicon.ico', (req, res) => res.sendStatus(204));

        server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
            res.status(err.statusCode || 500).json({
                status: 'error',
                statusCode: err.statusCode,
                message: err.message
            });
        });

        ((port = process.env.APP_PORT || 5000) => {
            server.app.listen(port, () => log(`Listening on port ${port}`, 'INFO', 'Server'));
        })();

    }, error => {
        console.error(error);
    });