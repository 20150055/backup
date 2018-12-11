export interface IApiMessage {
    name: string,
    type: MessageType,
    args?: { [index: string]: string }
}

export enum MessageType{info = "info",warning = "warning", error = "error", success = "success"}

export interface IServerResponse {
    messages: IApiMessage[]
    payload?: {[index: string]: any}
}