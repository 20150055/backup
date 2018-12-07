import "reflect-metadata";
import * as express from "express";
import * as crypto from "crypto";
import * as path from "path";

import { createConnection, Connection } from "typeorm";
import { User } from "./entity/User";
import { BackupJob } from "./entity/BackupJob";
import { ScheduledBackup } from "./entity/ScheduledBackup";
import { Local_SFTP_BackupRepository } from "./entity/Local_SFTP_BackupRepository";
import { S3_Amazon_BackupRepository } from "./entity/S3_Amazon_BackupRepository";

import "./scheduling";
import { connection } from "./sqliteConnection";
import { stat } from "fs";

const app = express();


//Webserver
app.use("/", express.static(path.join(path.dirname(path.dirname(__dirname)), "gui", "dist")));
app.listen(8080);


setTimeout(createExampleData,1000);


async function createExampleData(){
    await create_Local_SFTP_Repository("Local", "Test2", "test2", "D:/#Trash/Test2Repo"),
    await create_Local_SFTP_Repository("Local", "Test1", "test1", "D:/#Trash/TestRepo")
    await createBackupjob(1, "MyBackup", 10, 60, "Always send emails", "E:\\Schule\\1AHIF\\E;E:\\Schule\\1AHIF\\HTML\\Pong");
    await createScheduledBackup(1, 2, new Date(Date.now()), true, false, false, false, false, false, false );
}

async function create_Local_SFTP_Repository(repoType: string, repoName: string, repoPassword: string, repoLocation: string){
        const repository = new Local_SFTP_BackupRepository();
        repository.repoType = repoType;
        repository.repoName = repoName;
        repository.repoPassword = hash(repoPassword);
        repository.repoLocation = repoLocation;
        await connection.manager.save(repository);
}

async function create_S3_Amazon_Repository(repoType: string, repoName: string, repoPassword: string, repoLocation: string, accessKey: string, secretAccessKey: string){
        const repository = new S3_Amazon_BackupRepository();
        repository.repoType = repoType;
        repository.repoName = repoName;
        repository.repoPassword = hash(repoPassword);
        repository.repoLocation = repoLocation;
        repository.accessKey = accessKey;
        repository.secretAccessKey = secretAccessKey;
        await connection.manager.save(repository);
}

async function createBackupjob(repoId: number, name: string, maxBackups: number, autoUnlock: number, emailNotification: string, backupLocations: string){
        const backupJob = new BackupJob();
        backupJob.repoId = repoId;
        backupJob.name = name;
        backupJob.maxBackups = maxBackups;
        backupJob.autoUnlock = autoUnlock;
        backupJob.emailNotification = emailNotification;
        backupJob.backupLocations = backupLocations;
        await connection.manager.save(backupJob);
}

async function createScheduledBackup(backupId: number, weeklyRepeat: number, starttime: Date,
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
        await connection.manager.save(scheduledBackup);
}


async function createUser(firstName: string, lastName: string, email: string, password: string){

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = hash(password);
        await connection.manager.save(user);
}

async function loadUser(searchEmail: string){
    const user: User = await connection.manager.getRepository(User).findOne({email: searchEmail});
    return user;
}

function hash(word: string) :string {
    const hash = crypto.createHmac("sha512","").update(word).digest("hex");
    return hash;
}
