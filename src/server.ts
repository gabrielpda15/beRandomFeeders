import express, { Router, Express } from "express";
import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from "typeorm";

export class Server {

    public app: Express;
    public router: Router;
    
    private connectionOptions: ConnectionOptions;
    private connection: Connection;

    constructor() {
        this.app = express();
        this.router = Router();
    }

    public async createConnection(): Promise<void> {
        this.connectionOptions = await getConnectionOptions();
        this.connection = await createConnection(this.connectionOptions);
    }

    public async getConnection(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        } else {
            this.connection = await createConnection(this.connectionOptions);
            return this.connection;
        }
    }



}