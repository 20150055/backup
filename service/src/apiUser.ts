import * as express from "express";
import * as uuidv4 from "uuid/v4";
import { IApiMessage, IServerResponse, MessageType } from "./shared/types";
import { User } from "./entity/User";
import { database } from "./sqliteConnection";
import { sendResponse } from "./ApiResponse";


const router = express.Router();

router.post("/login", async function (request, response) {
    if (request.body.username && request.body.password) {
        try {
            const user: User = await database.loadUserByUsername(request.body.username);
            if (user.password === database.hash(request.body.password)) {
                sendResponse(response, 200, { messages: [{ name: "api.success.user.login", type: MessageType.success }], payload: { token: uuidv4() } });
            } else {
                sendResponse(response, 400, { messages: [{ name: "api.error.user.login.missing-username", type: MessageType.error }] });
            }
        } catch (error) {
            sendResponse(response, 404, { messages: [{ name: "api.error.user.login.user-not-found", type: MessageType.error, args: { "username": request.body.username } }]});
        }
    } else {
        let errormessages: IApiMessage[] = [];
        if (!request.body.username) {
            errormessages.push({ name: "api.error.user.login.missing-data.username", type: MessageType.error });
        }
        if (!request.body.password) {
            errormessages.push({ name: "api.error.user.login.missing-data.password", type: MessageType.error });
        }
        sendResponse(response, 400, { messages: errormessages });
    }
});

router.post("/register", async function (request, response) {
    if (request.body.firstName && request.body.lastName && request.body.username && request.body.email && request.body.password) {
        try {
            if (await database.loadUserByUsername(request.body.username)) {
                sendResponse(response, 400, { messages: [{ name: "api.error.user.register.username-already-exists", type: MessageType.error, args: { "username": request.body.username } }]});
            } else {
                database.createUser(request.body.firstName, request.body.lastName, request.body.username, request.body.email, request.body.password);
                sendResponse(response, 200, { messages: [{ name: "api.success.user.register", type: MessageType.success }]});
            }
        } catch (error) {
            let errorstring: string = error.toString();
            sendResponse(response, 400, { messages: [{ name: "api.error.user.register.other", type: MessageType.error, args: { "error": errorstring } }]});
        }
    } else {
        let errormessages: IApiMessage[] = [];
        if (!request.body.firstName) {
            errormessages.push({ name: "api.error.user.register.missing-data.firstName", type: MessageType.error });
        }
        if (!request.body.lastName) {
            errormessages.push({ name: "api.error.user.register.missing-data.lastName", type: MessageType.error });
        }
        if (!request.body.username) {
            errormessages.push({ name: "api.error.user.register.missing-data.username", type: MessageType.error });
        }
        if (!request.body.email) {
            errormessages.push({ name: "api.error.user.register.missing-data.email", type: MessageType.error });
        }
        if (!request.body.password) {
            errormessages.push({ name: "api.error.user.register.missing-data.password", type: MessageType.error });
        }
        sendResponse(response, 400, { messages: errormessages });
    }
});

router.get("/anyExists", async function (request, response) {
    try{
        const count: number = await database.countUsers();
        if( count > 0 ){
            sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.true", type: MessageType.info }]});
        }else{
            sendResponse(response, 200, { messages: [{ name: "api.info.user.anyExists.false", type: MessageType.info }]});
        }
    }catch(error){
        let errorstring: string = error.toString();
        sendResponse(response, 400, { messages: [{ name: "api.error.user.anyExists.unknown", type: MessageType.error, args: { "error": errorstring } }]});
    }
});

export default router;