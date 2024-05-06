import type { components } from "@/openapi/landmarks";

type NotFound = components["responses"]["NotFound"]["content"]["application/json"]
type BadRequest = components["responses"]["BadRequest"]["content"]["application/json"]
type InternalServer = components["responses"]["InternalServerError"]["content"]["application/json"]

export class NotFoundError extends Error {
    notFoundId: string;
    requestId: string;
    constructor(e: NotFound) {
        super(e.messageId);
        
        this.notFoundId = e.notFoundId;
        this.requestId = e.requestId;
    }
}
export class BadRequestError extends Error {

    requestId: string;
    arguments: { [key: string]: unknown; };
    constructor(e: BadRequest) {
        super(e.messageId);
        // this.message = t(e.messageId,e.arguments)
        this.requestId = e.requestId;
        this.arguments = e.arguments;
    }
}

export class ServerError extends Error {

    requestId: string;
    arguments: { [key: string]: unknown; };
    constructor(e: InternalServer) {
        super(e.messageId);
        // this.message = t(e.messageId,e.arguments)
        this.requestId = e.requestId;
        this.arguments = e.arguments;
    }
}
