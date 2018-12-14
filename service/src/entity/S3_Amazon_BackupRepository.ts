import {Entity, Column} from "typeorm";
import {Local_SFTP_BackupRepository} from "./Local_SFTP_BackupRepository";

@Entity()
export class S3_Amazon_BackupRepository extends Local_SFTP_BackupRepository{

    @Column()
    accessKey: string;

    @Column()
    secretAccessKey: string;
}
