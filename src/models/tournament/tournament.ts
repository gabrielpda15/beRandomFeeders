import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rule } from "./rule";
import { TournamentDate } from "./date";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    title: string;

    @Column('text')
    description?: string;

    @Column('text', { nullable: false })
    prize?: string;

    @ManyToOne(() => Rule, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
    rule: Rule;

    @Column('date', { nullable: false })
    openingDate: Date;

    @Column('date', { nullable: false })
    expirationDate: Date;

    @OneToMany(() => TournamentDate, x => x.tournament)
    dates: TournamentDate[];

    @Column('boolean')
    ended: boolean;

}