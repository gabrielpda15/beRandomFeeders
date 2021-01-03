import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { server } from "../app";
import ActionResult from "./models/actionresult";
import ErrorHandler from "./models/errorhandler";

export class ControllerBase {

    protected get connection(): Promise<Connection> {
        return new Promise<Connection>(async (resolve, reject) => {
            await server.getConnection();
        });
    }

    protected ok(result?: any): ActionResult {
        return {
            statusCode: 200,
            result: result
        }
    }

    protected badRequest(result?: any): ActionResult {
        return {
            statusCode: 400,
            result: result
        }
    }

    protected throwError(message: string, statusCode?: number): ActionResult {
        throw new ErrorHandler(statusCode ?? 400, message);
    }

}