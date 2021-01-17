import { Request } from "express";
import { server } from "../app";
import { ControllerBase } from "../lib/controllerbase";
import { ApiController, HttpGet, HttpPost } from "../lib/decorators";
import ActionResult from "../lib/models/actionresult";
import { Rule } from "../models/tournament/rule";

@ApiController('/tournament')
export class TournamentController extends ControllerBase {

    @HttpGet('/rules')
    public async GetRules(req: Request): Promise<ActionResult> {
        const conn = await server.getConnection();
        const repo = conn.getRepository(Rule);
        const rules = await repo.find();
        return this.ok(rules);
    }

    @HttpPost('/subscription')
    public async PostSubscription(req: Request): Promise<ActionResult> {



        return this.ok();
    }

}