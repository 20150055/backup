import * as express from "express";
import { IServerResponse } from "./shared/types";

export function sendResponse(res: express.Response, code: number, data: IServerResponse) {
    res.status(code).json(data);
}