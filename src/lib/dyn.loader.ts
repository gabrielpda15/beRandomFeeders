import * as path from 'path';
import glob from 'glob';
import { Router } from 'express';
import ActionResult from './models/actionresult';
import { log } from './util';

export async function loadControllers(): Promise<{route: string, instance: Router}[]> {

    log('Loading controllers...', 'INFO', 'DynLoader');

    return new Promise<{route: string, instance: Router}[]>((resolve, reject) => {
        try {
            glob(path.resolve(__dirname, '../controllers/**/*.controller.ts'),
                async (er, m) => {
                    if (!er) {
                        const result = [];
                        for (let file of m) {
                            const f = await import(file).catch(error => { throw error; });
                            const prototype = (Object.values(f)[0] as any).prototype;
                            const route = prototype.route;
                            const instance: any = new (Object.values(f)[0] as any)();
                            const router = Router();

                            for (let item of Object.getOwnPropertyNames(prototype)) {
                                if (prototype[item].route) {
                                    switch (prototype[item].method) {
                                        case 'get':
                                            router.get(prototype[item].route, async (req, res, next) => {
                                                const ar: ActionResult = await prototype[item](req);
                                                if (ar.result) res.status(ar.statusCode).json(ar.result);
                                                else res.sendStatus(ar.statusCode);
                                            });
                                    }
                                }
                            }

                            result.push({
                                route: route,
                                instance: router
                            });
                        }
                        resolve(result);
                    } else {
                        reject(er);
                    }
                });
        } catch (error) {
            reject(error);
        }
    });

}
