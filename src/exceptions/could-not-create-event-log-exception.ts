import { ResourceEventBody } from '@models/resource-event-body'

export class CouldNotEventLogException extends Error {
    constructor(resource: ResourceEventBody) {
        super(`Could not create log for resource: ${resource}`)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}
