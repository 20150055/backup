import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class BackupJob {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    repoId: number;

    @Column()
    name: string;

    @Column()
    maxBackups: number;  // Max number of backups

    @Column()
    autoUnlock: number;  // Minutes until automatic unlock

    @Column()
    emailNotification: string;  // Three values are possible

    @Column()
    backupLocations: string;    // Locations choosen for the backup seperated by ";"
}
