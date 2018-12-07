import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    firstName: string;

    @Column({length: 50})
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({length: 128})
    password: string;
}
