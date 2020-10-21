import * as AWSMock from 'aws-sdk-mock'
import { EventLogService } from '@services/event-log-service'
import { ResourceEventBody } from '@models/resource-event-body'

describe('Test for Access Controle Event Log', () => {
    test('test service ', async () => {
        const eventLogService = new EventLogService()

        //@ts-ignore
        AWSMock.mock('EventBridge', 'putEvents', (params, callback) => {
            callback(null, {
                FailedEntryCount: 0,
                Entries: [
                    {
                        EventId: '94f34661-daf9-a944-9b4a-787653358a74',
                    },
                ],
            })
        })

        const body: ResourceEventBody = {
            companyId: 28,
            productId: '194804',
            action: 'API',
            shortId: 'shorIdUrl',
            resource:
                'https://img.simplustec.com.br/product_images/7894900614008/1/7894900614008_12_1_1200_72_RGB.png',
        }

        const response = await eventLogService.putEvent(body)

        expect(eventLogService).toBeInstanceOf(EventLogService)
        expect(response).toBeDefined()
        expect(response.FailedEntryCount).toEqual(0)
    })

    afterEach(() => {
        AWSMock.restore('EventBridge', 'putEvents')
    })
})
