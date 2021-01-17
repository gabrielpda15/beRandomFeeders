import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Identity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 32, unique: true, nullable: false })
    username: string;

    @Column('varchar', { length: 256, nullable: false })
    passwordHash: string;

    @Column('varchar', { length: 32 })
    firstName: string;

    @Column('varchar', { length: 128 })
    lastName: string;

    @Column('varchar', { length: 128, unique: true, nullable: false })
    email: string;

    @Column('varchar', { length: 32 })
    discord: string;

    @Column('varchar', { length: 32 })
    nickLol: string;

    @Column('varchar', { length: 128, unique: true })
    uuid: string;

}