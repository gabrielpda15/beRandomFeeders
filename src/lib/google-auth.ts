import axios, { AxiosResponse } from 'axios';
import { HmacSHA1 } from 'crypto-js';
import * as OTPAuth from 'otpauth';
import { isLittleEndian } from './util';
import Config from './google-auth.config.json'

export class GoogleAuth {

    private totp: OTPAuth.TOTP;

    constructor(label: string, secret: string) {
        this.totp = new OTPAuth.TOTP({
            issuer: Config.issuer,
            algorithm: Config.algorithm,
            digits: Config.digits,
            period: Config.period,
            label: label,
            secret: OTPAuth.Secret.fromRaw(secret)
        });
    }

    public toString(): string {
        return this.totp.toString();
    }

    public getPin(): string {
        return this.totp.generate();
    }

    public async requestQRCode(): Promise<any> {
        const reqUri = Config.chartUrl.replace('{{uri}}', encodeURIComponent(this.toString()));
        console.log({reqUri: reqUri})
        const res = await axios.get<any>(reqUri, { responseType: 'arraybuffer' });

        if (res.status === 200) return res.data;

        throw res.data;
    }

}