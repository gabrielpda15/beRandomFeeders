import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament";

@Entity()
export class TournamentDate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('date', { nullable: false })
    start: Date;

    @Column('date')
    end?: Date;

    @Column('timestamp', { nullable: false })
    time: Date;

    @Column('varchar', { length: 128, nullable: false })
    title: string;

    @ManyToOne(() => Tournament, x => 
        x.dates, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
    tournament: Tournament;

}