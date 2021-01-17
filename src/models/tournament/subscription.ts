import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Identity } from "../security/identity";
import { Tournament } from "./tournament";

@Entity()
export class Subscription {

    @ManyToOne(() => Identity, 
        { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false, primary: true })
    identity: Identity;

    @ManyToOne(() => Tournament, 
        { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: false, primary: true })
    tournament: Tournament;

    @Column('varchar', { length: 32, nullable: false })
    uuid: string;

    @Column('text')
    description: string;

    @Column('text')
    observation: string;

    @Column('boolean')
    denied: boolean;

    @Column('boolean')
    main: boolean;

}