import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

import { EventLogService } from '@services/event-log-service'
import { ResourceEventBody } from '@models/resource-event-body'
import { StatusCodes } from 'http-status-codes'
<<<<<<< HEAD
import { Logger } from 'lambda-logger-node'

const logger = Logger('resource-data-event-logger')
=======
>>>>>>> 1237b2dd46cddac820f6fe4db4b20474c3c25cf6

export const entrypoint: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const eventBody: ResourceEventBody = parseEventBody(event.body)
        const eventLog = new EventLogService()
        await eventLog.putEvent(eventBody)
        return okResponse()
    } catch (error) {
<<<<<<< HEAD
        logger.error(`Unable to create event log: ${error}`)
=======
>>>>>>> 1237b2dd46cddac820f6fe4db4b20474c3c25cf6
        return badRequestResponse()
    }
}

type ResponseBody = {
    statusCode: number
    body: string
}

function responseBuilder(statusCode: number, body: object): ResponseBody {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    }
}

function okResponse(): ResponseBody {
<<<<<<< HEAD
    logger.info('Event log created')
=======
>>>>>>> 1237b2dd46cddac820f6fe4db4b20474c3c25cf6
    return responseBuilder(StatusCodes.OK, { message: 'Event log created' })
}

function badRequestResponse(): ResponseBody {
<<<<<<< HEAD
    return responseBuilder(StatusCodes.BAD_REQUEST, { error: 'Unable to create event log' })
=======
    return responseBuilder(StatusCodes.BAD_REQUEST, { error: 'Undable to create event log' })
>>>>>>> 1237b2dd46cddac820f6fe4db4b20474c3c25cf6
}

function parseEventBody(body: any): ResourceEventBody {
    const resourceData = JSON.parse(body)
    return {
        ...resourceData,
    }
}
