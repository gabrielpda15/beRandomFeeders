import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rule {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 80, nullable: false })
    title: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('varchar', { length: 32, nullable: false })
    icon: string;
    
    @Column('varchar', { length: 16, nullable: false })
    initials: string;

    @Column('varchar', { length: 16, nullable: false })
    bg?: string;

}