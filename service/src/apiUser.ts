import * as express from "express";
import * as uuidv4 from "uuid/v4";
import { IApiError } from "./shared/types";
import { User } from "./entity/User";
import { database } from "./sqliteConnection";



const router = express.Router();

router.post("/login", async function (request, response) {
    if (request.body.username && request.body.password) {
        try {
            const user: User = await database.loadUserByUsername(request.body.username);
            if (user.password === database.hash(request.body.password)) {
                response.status(200).json({ messages: [{ name: "api.success.user.login" }], payload: { token: uuidv4() } });
            } else {
                response.status(400).json({ messages: [{ name: "api.error.user.login.missing-username"}] });
            }
        } catch (error) {
            response.status(404).json({ messages: [{ name: "api.error.user.login.user-not-found", args: { "username": request.body.username } }] });
        }
    } else {
        let errormessages: IApiError[] = [];
        if(!request.body.username){
            errormessages.push({ name: "api.error.user.login.missing-data.username" });
        }
        if(!request.body.password){
            errormessages.push({ name: "api.error.user.login.missing-data.password" });
        }
        response.status(400).json({ messages: errormessages });
    }
});

router.post("/register", async function (request, response) {
    if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
        try {
            if (await database.loadUserByUsername(request.body.username)) {
                response.status(400).json({ messages: [{ name: "api.error.user.register.username-already-exists", args: { "username": request.body.username } }] });
            } else {
                database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                response.status(200).json({ messages: [{ name: "api.success.user.register" }] });
            }
        } catch (error) {
            let errorstring: string = error.toString();
            response.status(400).json({ messages: [{ name: "api.error.user.register.other", args: { "error": errorstring } }] });
        }
    } else {
        let errormessages: IApiError[] = [];
        if(!request.body.firstName){
            errormessages.push({ name: "api.error.user.missing-data.firstName" });
        }
        if(!request.body.lastName){
            errormessages.push({ name: "api.error.user.missing-data.lastName" });
        }
        if(!request.body.username){
            errormessages.push({ name: "api.error.user.missing-data.username" });
        }
        if(!request.body.email){
            errormessages.push({ name: "api.error.user.missing-data.email" });
        }
        if(!request.body.password){
            errormessages.push({ name: "api.error.user.missing-data.password" });
        }
        response.status(400).json({ messages: errormessages });
    }
});

export default router;