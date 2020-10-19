import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

import { EventLogService } from '@services/event-log-service'
import { ResourceEventBody } from '@models/resource-event-body'
import { StatusCodes } from 'http-status-codes'
import { Logger } from 'lambda-logger-node'

const logger = Logger('resource-data-event-logger')

export const entrypoint: APIGatewayProxyHandlerV2 = async (event) => {
    try {
        const eventBody: ResourceEventBody = parseEventBody(event.body)
        const eventLog = new EventLogService()
        await eventLog.putEvent(eventBody)
        return okResponse()
    } catch (error) {
        logger.error(`Unable to create event log: ${error}`)
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
    logger.info('Event log created')
    return responseBuilder(StatusCodes.OK, { message: 'Event log created' })
}

function badRequestResponse(): ResponseBody {
    return responseBuilder(StatusCodes.BAD_REQUEST, { error: 'Unable to create event log' })
}

function parseEventBody(body: any): ResourceEventBody {
    const resourceData = JSON.parse(body)
    return {
        ...resourceData,
    }
}
