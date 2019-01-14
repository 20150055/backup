//import "../index.js";
function repository_lokal() {
}
/*  ZUM REPOSITORY ERSTELLEN:
    -->LOKAL
    restic init --repo /srv/restic-repo
    Passwort mit übergeben
    Passwort ein zweites Mal eingeben

    --> SFTP
    restic -r sftp:user@host:/srv/restic-repo init
    Passwort mit übergeben
    Passwort ein zweites Mal eingeben

    --> S3
    restic -r s3:s3.amazonaws.com/bucket_name init
    Passwort mit übergeben
    Passwort ein zweites Mal eingeben
    
    var initial = Repo{
        Name: "Backup",
        Type: "s3",
        Location: "s3:s3.amazonaws.com/bucket_name",
        EnvVariables: []string{"AWS_ACCESS_KEY_ID=MY_ACCESS_KEY", "AWS_SECRET_ACCESS_KEY=MY_SECRET_ACCESS_KEY"},
        ID: 0, //ignored when id == 0
        Password: "password",
    }

*/ 
//# sourceMappingURL=index.js.map