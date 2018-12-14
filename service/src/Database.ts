import * as crypto from "crypto";

import { Connection } from "typeorm";
import { User } from "./entity/User";
import { BackupJob } from "./entity/BackupJob";
import { ScheduledBackup } from "./entity/ScheduledBackup";
import { Local_SFTP_BackupRepository } from "./entity/Local_SFTP_BackupRepository";
import { S3_Amazon_BackupRepository } from "./entity/S3_Amazon_BackupRepository";



export class Database {
    connection: Connection;

    constructor(conn: Connection) { this.connection = conn; }

    async create_Local_SFTP_Repository(repoType: string, repoName: string, repoPassword: string, repoLocation: string){
        const repository = new Local_SFTP_BackupRepository();
        repository.repoType = repoType;
        repository.repoName = repoName;
        repository.repoPassword = this.hash(repoPassword);
        repository.repoLocation = repoLocation;
        await this.connection.manager.save(repository);
    }
    
    async create_S3_Amazon_Repository(repoType: string, repoName: string, repoPassword: string, repoLocation: string, accessKey: string, secretAccessKey: string){
        const repository = new S3_Amazon_BackupRepository();
        repository.repoType = repoType;
        repository.repoName = repoName;
        repository.repoPassword = this.hash(repoPassword);
        repository.repoLocation = repoLocation;
        repository.accessKey = accessKey;
        repository.secretAccessKey = secretAccessKey;
        await this.connection.manager.save(repository);
    }
    
    async createBackupjob(repoId: number, name: string, maxBackups: number, autoUnlock: number, emailNotification: string, backupLocations: string){
        const backupJob = new BackupJob();
        backupJob.repoId = repoId;
        backupJob.name = name;
        backupJob.maxBackups = maxBackups;
        backupJob.autoUnlock = autoUnlock;
        backupJob.emailNotification = emailNotification;
        backupJob.backupLocations = backupLocations;
        await this.connection.manager.save(backupJob);
    }
    
    async createScheduledBackup(backupId: number, weeklyRepeat: number, starttime: Date,
        monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean, ){
            
        const scheduledBackup = new ScheduledBackup();
        scheduledBackup.backupId = backupId;
        scheduledBackup.weeklyRepeat = weeklyRepeat;
        scheduledBackup.starttime = starttime;
        scheduledBackup.monday = monday;
        scheduledBackup.tuesday = tuesday;
        scheduledBackup.wednesday = wednesday;
        scheduledBackup.thursday = thursday;
        scheduledBackup.friday = friday;
        scheduledBackup.saturday = saturday;
        scheduledBackup.sunday = sunday;
        await this.connection.manager.save(scheduledBackup);
    }
    
    
    async createUser(firstName: string, lastName: string, username: string, email: string, password: string){
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.password = this.hash(password);
        await this.connection.manager.save(user);
    }
    
    async loadUserByUsername(searchUsername: string){
        const user: User = await this.connection.manager.getRepository(User).findOne({username: searchUsername});
        return user;
    }

    async countUsers(){
        const count: number = await this.connection.manager.getRepository(User).count();
        return count;
    }
    
    hash(word: string) :string {
        const hash = crypto.createHmac("sha512","").update(word).digest("hex");
        return hash;
    }
}

