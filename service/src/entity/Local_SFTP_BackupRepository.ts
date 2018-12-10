import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Local_SFTP_BackupRepository {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    repoType: string;

    @Column({length: 50,unique: true})
    repoName: string;

    @Column({length: 128})
    repoPassword: string;   //TODO: encrypt

    @Column()
    repoLocation: string;
}
