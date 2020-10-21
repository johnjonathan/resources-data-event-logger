import * as AWSMock from 'aws-sdk-mock'

import { EventBridge } from 'aws-sdk'
import { eventBus } from '@config/event-bus'
// import { EventLogService } from '@services/event-log-service'
// import { ResourceEventBody } from '@models/resource-event-body'

jest.mock('@services/event-log-service')

describe('Test for Access Controle Event Log', () => {
    // let eventLogService: EventLogService

    beforeEach(() => {
        // eventLogService = new EventLogService()

        AWSMock.mock('EventLogService', 'putEvent', (callback) => {
            callback(null, {
                FailedEntryCount: 0,
                Entries: [
                    {
                        EventId: '94f34661-daf9-a944-9b4a-787653358a74',
                    },
                ],
            })
        })
    })

    test('should call eventbridge without any failures', async () => {
        const event = {
            body: JSON.stringify({
                companyId: 28,
                productId: '194804',
                action: 'API',
                resource:
                    'https://img.simplustec.com.br/product_images/7894900614008/1/7894900614008_12_1_1200_72_RGB.png',
            }),
        }

        const eventBridge = new EventBridge()
        const response = await eventBridge
            .putEvents({
                Entries: [
                    {
                        Source: eventBus.SOURCE_ID,
                        EventBusName: eventBus.NAME,
                        DetailType: eventBus.DETAIL_TYPE,
                        Time: new Date(),
                        Detail: JSON.stringify(event),
                    },
                ],
            })
            .promise()

        expect(response.FailedEntryCount).toEqual(0)
        expect(response.Entries[0].EventId).toEqual('94f34661-daf9-a944-9b4a-787653358a74')
    })

    afterEach(() => {
        AWSMock.restore('EventLogService')
    })
})
