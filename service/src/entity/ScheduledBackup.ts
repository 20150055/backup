import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class ScheduledBackup {

    @PrimaryColumn()
    backupId: number;

    @Column()
    weeklyRepeat: number;

    @Column("datetime")
    starttime: Date;

    /*
        The default value for boolean is "false" in general
    */
    @Column()
    monday: boolean;

    @Column()
    tuesday: boolean;

    @Column()
    wednesday: boolean;

    @Column()
    thursday: boolean;

    @Column()
    friday: boolean;

    @Column()
    saturday: boolean;

    @Column()
    sunday: boolean;
}