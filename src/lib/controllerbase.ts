import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { server } from '../app';
import ActionResult, { ContentType } from './models/actionresult';
import ErrorHandler from './models/errorhandler';

export class ControllerBase {

    protected get connection(): Promise<Connection> {
        return new Promise<Connection>(async (resolve, reject) => {
            await server.getConnection();
        });
    }

    protected ok(result?: any, contentType?: ContentType): ActionResult {
        return {
            statusCode: 200,
            contentType: contentType ?? 'json',
            result: result
        }
    }

    protected badRequest(result?: any, contentType?: ContentType): ActionResult {
        return {
            statusCode: 400,
            contentType: contentType ?? 'json',
            result: result
        }
    }

    protected unauthorized(result?: any, contentType?: ContentType): ActionResult {
        return {
            statusCode: 401,
            contentType: contentType ?? 'json',
            result: result
        }
    }

    protected throwError(message: string, statusCode?: number): ActionResult {
        throw new ErrorHandler(statusCode ?? 400, message);
    }

}