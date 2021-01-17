import { Request } from 'express';
import axios, { AxiosResponse } from 'axios';
import { server } from '../app';
import { ControllerBase } from '../lib/controllerbase';
import { ApiController, HttpGet, HttpPost } from '../lib/decorators';
import ActionResult from '../lib/models/actionresult';
import { emailRegex, getToken } from '../lib/util';
import { Identity } from '../models/security/identity';
import { Login } from '../viewmodels/login';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MD5 } from '../lib/md5';
import { GravatarResult } from '../lib/models/gravatar';
import { GoogleAuth } from '../lib/google-auth';
import { read } from 'fs';

@ApiController('/identity')
export class IdentityController extends ControllerBase {

    @HttpGet('/loginadmin')
    public async Get(req: Request): Promise<ActionResult> {
        const exp = Date.now() + (100 * 60 * 60 * 1000 * 24 * 30);
        const token = await getToken({
            jti: uuidv4(),
            iss: 'http://randomfeeders.com.br/',
            aud: 'http://randomfeeders.com.br/',
            sub: 'admin',
            exp: exp,
            data: null
        });
        return this.ok({
            authenticated: true,
            token: `Bearer ${token}`,
            exp: new Date(exp)
        });
    }

    @HttpPost('/')
    public async Post(req: Request): Promise<ActionResult> {
        const obj = req.body as Identity;
        const conn = await server.getConnection();
        const repo = conn.getRepository(Identity);

        let uuid = uuidv4();
        let uuidQuery: Identity = null;
        do {
            uuidQuery = await repo.createQueryBuilder('identity')
                .where('identity.uuid = :uuid', { uuid: uuid })
                .getOne();
        } while (uuidQuery != null);

        obj.uuid = uuid;
        obj.passwordHash = await bcrypt.hash(obj.passwordHash, 10);

        try { await repo.save(obj); }
        catch (error) { this.badRequest(error) }

        delete obj.uuid;
        return this.ok(obj);
    }

    @HttpGet('/avatar/:email')
    public async GetAvatar(req: Request): Promise<ActionResult> {
        const result = await this.RequestAvatar(req.params.email);

        if (result.status === 200) {
            return this.ok(result.data.entry[0]);
        }

        return this.badRequest({
            status: result.status,
            data: result.data
        });
    }

    private async RequestAvatar(email: string): Promise<AxiosResponse<GravatarResult>> {
        const hash = MD5(email);
        return await axios.get<GravatarResult>(`https://www.gravatar.com/${hash}.json`);
    }

    @HttpGet('/pin/:id')
    public async getPin(req: Request): Promise<ActionResult> {
        const conn = await server.getConnection();
        const repo = conn.getRepository(Identity);
        const query = repo.createQueryBuilder('identity');
        let result: Identity = null;
        if (emailRegex.test(req.params.id)) {
            result = await query.where('identity.email = :un', { un: req.params.id }).getOne();
        } else {
            result = await query.where('identity.username = :un', { un: req.params.id }).getOne();
        }

        const auth = new GoogleAuth(result.email, result.uuid);

        return this.ok(auth.getPin());
    }

    @HttpGet('/qrcode/:id')
    public async getQRCode(req: Request): Promise<ActionResult> {
        const conn = await server.getConnection();
        const repo = conn.getRepository(Identity);
        const query = repo.createQueryBuilder('identity');
        let result: Identity = null;
        if (emailRegex.test(req.params.id)) {
            result = await query.where('identity.email = :un', { un: req.params.id }).getOne();
        } else {
            result = await query.where('identity.username = :un', { un: req.params.id }).getOne();
        }

        const auth = new GoogleAuth(result.email, result.uuid);
        console.log(auth.toString());

        try {
            const data = await auth.requestQRCode();
            return this.ok(data, 'image');
        } catch (err) {
            return this.badRequest(err);
        }
    }

    @HttpPost('/login')
    public async PostLogin(req: Request): Promise<ActionResult> {
        const login = req.body as Login;
        const conn = await server.getConnection();
        const repo = conn.getRepository(Identity);
        const query = repo.createQueryBuilder('identity');
        let result: Identity = null;
        if (emailRegex.test(login.username)) {
            result = await query.where('identity.email = :un', { un: login.username }).getOne();
        } else {
            result = await query.where('identity.username = :un', { un: login.username }).getOne();
        }

        const gravatarRequest = await this.RequestAvatar(result.email);

        const tokenData: any = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            avatar: gravatarRequest.status === 200 ? gravatarRequest.data.entry[0].thumbnailUrl : null
        };

        if (query) {
            if (await bcrypt.compare(login.password, result.passwordHash)) {
                const exp = new Date((new Date()).toUTCString());
                exp.setTime(+exp + (3 * 60 * 60 * 1000));
                const token = await getToken({
                    jti: uuidv4(),
                    iss: 'randomfeeders.com.br',
                    aud: 'randomfeeders.com.br',
                    sub: result.username,
                    exp: exp.getTime(),
                    iat: new Date((new Date()).toUTCString()).getTime(),
                    data: tokenData
                });

                const authResult: any = {
                    authenticated: true,
                    token: `Bearer ${token}`,
                    exp: exp.toUTCString()
                };

                if (tokenData.avatar) authResult['avatar'] = tokenData.avatar;

                return this.ok(authResult);
            }
        }

        return this.unauthorized({
            authenticated: false,
            message: 'Usuário e/ou senha inválidos!'
        });
    }

}