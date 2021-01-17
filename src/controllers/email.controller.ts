import { Request } from 'express';
import { ControllerBase } from '../lib/controllerbase';
import { ApiController, HttpPost } from '../lib/decorators';
import ActionResult from '../lib/models/actionresult';
import Email from '../lib/email/smtp'

@ApiController('/email')
export class EmailController extends ControllerBase {

    @HttpPost('/send')
    public async Send(req: Request): Promise<ActionResult> {

        const result = await Email.send({
            SecureToken: process.env.SMTP_EMAIL_TOKEN,
            To: req.body.to ?? 'contato@randomfeeders.com.br',
            From: req.body.from ?? 'contato@randomfeeders.com.br',
            Subject: req.body.subject ?? '',
            Body: req.body.body ??  '',
            Attachments: req.body.attachments ??  []
        });

        return this.ok(result);
    }

}