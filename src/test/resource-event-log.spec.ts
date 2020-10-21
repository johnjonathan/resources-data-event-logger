import * as AWSMock from 'aws-sdk-mock'
import * as AWS from 'aws-sdk'
// import { EventBridge } from 'aws-sdk'

import { entrypoint } from '@functions/resource-data-event-logger'
import { StatusCodes } from 'http-status-codes'
import 'jest-extended'
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda'

// import { EventLogService } from '@services/event-log-service'
jest.mock('@services/event-log-service')

describe('Test for `resources-data-logger` event', () => {
    beforeAll(async (done) => {
        //get requires env vars
        AWSMock.setSDKInstance(AWS)
        done()
    })

    test('Should create event to be logged', async () => {
        const event = {
            body: JSON.stringify({
                companyId: 28,
                productId: '194804',
                action: 'API',
                resource:
                    'https://img.simplustec.com.br/product_images/7894900614008/1/7894900614008_12_1_1200_72_RGB.png',
            }),
        }

        const responseBody = (await entrypoint(
            event as APIGatewayProxyEventV2,
            {} as Context,
            () => {}
        )) as APIGatewayProxyStructuredResultV2

        expect(responseBody).not.toBeNull()
        expect(responseBody.statusCode).toEqual(StatusCodes.OK)
        expect(responseBody.body).toBeTruthy()
        expect(responseBody.body).toInclude('message')
    })

    test('Should fail when request body is invalid', async () => {
        const responseBody = (await entrypoint(
            {} as APIGatewayProxyEventV2,
            {} as Context,
            () => {}
        )) as APIGatewayProxyStructuredResultV2

        expect(responseBody).not.toBeNull()
        expect(responseBody.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(responseBody.body).toBeTruthy()
        expect(responseBody.body).toInclude('error')
    })

    afterEach(() => {
        AWSMock.restore('EventBridge')
    })
})
