import * as fs from 'fs';
import jwt from 'jsonwebtoken';

export const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const privateKey: jwt.Secret = fs.readFileSync('jwtRS256.key');

export function log(message: string, severity: string, source: string) {
    console.log(`[${new Date().toLocaleString('en-US')}] ${('[' + severity + ']').padEnd(8)} ${source.padStart(10, ' ')} | ${message}`);
}

export function getToken(payload: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, { algorithm: 'RS256'}, (e, t) => {
            if (e || !t) reject(e);
            resolve(t);
        });
    });
}

export function isLittleEndian(): boolean {
    return new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
}

export function isBigEndian(): boolean {
    return new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12;
}