/*import { app, bootstrap, delay } from "./app";
import * as request from "supertest";
import { database } from "./sqliteConnection";
import { IRepository, IRepositoryOptionalId, RepoType } from "./shared/types";
import { tmpdir } from "os";
import * as path from "path";
import { mkdirp } from "fs-extra";
import * as rmdir from "rimraf";
import * as fsextra from "fs-extra";
beforeAll(async () => {
  await bootstrap();
});
afterEach(() => {
  return request(app).delete("/api/system/AppData");
});
afterAll(() => {
  rmdir(tmpdir() + "/Repofolder", function() {
    rmdir(tmpdir() + "/Repofolder2", function() {
      rmdir(tmpdir() + "/Backupfolder", function() {});
    });
  });
});

describe("System requests", () => {
  describe("Ping requests", () => {
    it("GET /api/system/ping", async () => {
      const result = await request(app).get("/api/system/ping");
      expect(result.status).toEqual(200);
      expect(result.body).toMatchSnapshot("ping response");
    });
  });
});

describe("User testing", () => {
  it("POST /api/user/register", async () => {
    const user = {
      firstName: "Max",
      lastName: "Mustermann",
      username: "maxmuster",
      email: "max.mustermann@test.com",
      password: "maxMuster1234!"
    };
    const result = await request(app)
      .post("/api/user/register")
      .send(user);
    expect(result.status).toEqual(200);
    result.body.payload.user.token = "";
    expect(result.body.payload.user).toMatchSnapshot("register user");
  });

  it("PUT /api/user/1", async () => {
    const user = {
      firstName: "Max",
      lastName: "Mustermann",
      username: "maxmuster",
      email: "max.mustermann@test.com",
      password: "maxMuster1234!"
    };
    const patchteduser = {
      firstName: "Daniel",
      lastName: "Pallinger",
      username: "maxmuster",
      email: "max.mustermann@test.com",
      password: "maxMuster1234!"
    };
    let result = await request(app)
      .post("/api/user/register")
      .send(user);
    expect(result.status).toEqual(200);
    result.body.payload.user.token = "";
    expect(result.body.payload.user).toMatchSnapshot("register user");
    result = await request(app)
      .put("/api/user/1")
      .send(patchteduser)
      .set("Authorization", result.body.payload.token);

    expect(result.status).toEqual(200);
    result.body.payload.user.token = "";
    expect(result.body.payload.user).toMatchSnapshot("update user");
  });

  it("/api/user/anyExists", async () => {
    let result = await request(app).get("/api/user/anyExists");
    expect(result.status).toEqual(200);
    expect(result.body.payload.value).toBeFalsy();
    const user = {
      firstName: "Max",
      lastName: "Mustermann",
      username: "maxmuster",
      email: "max.mustermann@test.com",
      password: "maxMuster1234!"
    };
    const resultObject = {
      user: {
        firstName: "Max",
        lastName: "Mustermann",
        username: "maxmuster",
        email: "max.mustermann@test.com",
        password:
          "f5b7e0d729ad19e5f7c6fe7520089c99814ba718265dcc50c78e73cff070977cb11d0a23ba737ee6c125be5ac4c1a67b4cceb68eddfabcc9236319a599969c45",
        token: "",
        archived: null,
        id: 1
      }
    };
    result = await request(app)
      .post("/api/user/register")
      .send(user);
    expect(result.status).toEqual(200);
    result.body.payload.user.token = "";
    expect(result.body.user).toMatchSnapshot("register user");
    result = await request(app).get("/api/user/anyExists");
    expect(result.status).toEqual(200);
    expect(result.body.payload.value).toBeTruthy();
  });
});

describe("Repository Testing", () => {
  describe("Local Repository Testing", () => {
    it("POST /api/user/1/repository", async () => {
      const user = {
        firstName: "Max",
        lastName: "Mustermann",
        username: "maxmuster",
        email: "max.mustermann@test.com",
        password: "maxMuster1234!"
      };
      const resultObject = {
        user: {
          firstName: "Max",
          lastName: "Mustermann",
          username: "maxmuster",
          email: "max.mustermann@test.com",
          password:
            "f5b7e0d729ad19e5f7c6fe7520089c99814ba718265dcc50c78e73cff070977cb11d0a23ba737ee6c125be5ac4c1a67b4cceb68eddfabcc9236319a599969c45",
          token: "",
          archived: null,
          id: 1
        }
      };

      let result = await request(app)
        .post("/api/user/register")
        .send(user);
      expect(result.status).toEqual(200);
      expect(result.body.user).toMatchSnapshot("register user");
      const localrepo: IRepositoryOptionalId = {
        archived: false,
        autoUnlock: 100,
        repoLocation: tmpdir() + "/RepoFolder",
        repoName: "Testrepo",
        repoPassword: "Testrepopassword",
        repoType: RepoType.Local,
        accessKey: "",
        secretAccessKey: ""
      };

      const resultLocalRepo: IRepository = {
        id: 1,
        archived: false,
        autoUnlock: 100,
        repoLocation: tmpdir() + "/RepoFolder",
        repoName: "Testrepo",
        repoPassword: "Testrepopassword",
        repoType: RepoType.Local,
        accessKey: "",
        secretAccessKey: ""
      };
      result = await request(app)
        .post("/api/user/1/repository")
        .send(localrepo)
        .set("Authorization", result.body.payload.token);
      console.log("RESULTREPOOOOOO", result.body);
      expect(result.status).toEqual(200);
      expect(result.body.payload.repo).toMatchSnapshot("create repo");
    });
    it("GET /api/user/1/repository", async () => {
      const user = {
        firstName: "Max",
        lastName: "Mustermann",
        username: "maxmuster",
        email: "max.mustermann@test.com",
        password: "maxMuster1234!"
      };
      const resultObject = {
        user: {
          firstName: "Max",
          lastName: "Mustermann",
          username: "maxmuster",
          email: "max.mustermann@test.com",
          password:
            "f5b7e0d729ad19e5f7c6fe7520089c99814ba718265dcc50c78e73cff070977cb11d0a23ba737ee6c125be5ac4c1a67b4cceb68eddfabcc9236319a599969c45",
          token: "",
          archived: null,
          id: 1
        }
      };

      const localrepo: IRepositoryOptionalId = {
        archived: false,
        autoUnlock: 100,
        repoLocation: tmpdir() + "/RepoFolder",
        repoName: "Testrepo",
        repoPassword: "Testrepopassword",
        repoType: RepoType.Local,
        accessKey: "",
        secretAccessKey: ""
      };

      let result = await request(app)
        .post("/api/user/register")
        .send(user);
      expect(result.status).toEqual(200);
      const token = result.body.payload.token;
      result.body.payload.user.token = "";
      expect(result.body.payload.user).toMatchSnapshot("register user");

      result = await request(app)
        .post("/api/user/1/repository")

        .send(localrepo)
        .set("Authorization", token);
      expect(result.status).toEqual(200);
      expect(result.body.repo).toMatchSnapshot("create repo");
      result = await request(app)
        .get("/api/user/1/repository")
        .send()
        .set("Authorization", token);

      expect(result.status).toEqual(200);
      expect(result.body.payload.repo).toMatchSnapshot("get repo");
    });
  });
  //describe("S3 Repository Testing", () => {});
});

describe("Backupjob Testing", () => {
  it("POST /api/user/1/backupJob", async () => {
    const user = {
      firstName: "Max",
      lastName: "Mustermann",
      username: "maxmuster",
      email: "max.mustermann@test.com",
      password: "maxMuster1234!"
    };
    const resultObject = {
      user: {
        firstName: "Max",
        lastName: "Mustermann",
        username: "maxmuster",
        email: "max.mustermann@test.com",
        password:
          "f5b7e0d729ad19e5f7c6fe7520089c99814ba718265dcc50c78e73cff070977cb11d0a23ba737ee6c125be5ac4c1a67b4cceb68eddfabcc9236319a599969c45",
        token: "",
        archived: null,
        id: 1
      }
    };

    const localrepo: IRepositoryOptionalId = {
      archived: false,
      autoUnlock: 100,
      repoLocation: tmpdir() + "/RepoFolder2",
      repoName: "Testrepo",
      repoPassword: "Testrepopassword",
      repoType: RepoType.Local,
      accessKey: "",
      secretAccessKey: ""
    };

    let result = await request(app)
      .post("/api/user/register")
      .send(user);
    expect(result.status).toEqual(200);
    const token = result.body.payload.token;
    result.body.payload.user.token = "";
    expect(result.body.payload.user).toMatchSnapshot("register user");

    result = await request(app)
      .post("/api/user/1/repository")

      .send(localrepo)
      .set("Authorization", token);
    expect(result.status).toEqual(200);
    expect(result.body.repo).toMatchSnapshot("create repo");
    await fsextra.mkdir(tmpdir() + "/Backupfolder");
    const backupjob = {
      repoId: 1,
      name: "testjob1",
      maxBackups: 10,
      emailNotification: "never",
      backupLocations: tmpdir() + "/Backupfolder",
      cronInterval: "*/ /*10 * * * *",
active: true,
startDate: 10
};

const resultBackupjob = {
user: "1",
repoId: 1,
name: "testjob1",
maxBackups: 10,
emailNotification: "never",
backupLocations: tmpdir() + "/Backupfolder",
cronInterval: "*/ /*10 * * * *",
prevScheduledDate: 10,
startDate: 10,
active: true,
archived: false,
id: 1
};

result = await request(app)
.post("/api/user/1/backupJob")
.send(backupjob)
.set("Authorization", token);
console.log("result", result.body);

expect(result.status).toEqual(200);
});
});
*/ 
//# sourceMappingURL=apptest.js.map