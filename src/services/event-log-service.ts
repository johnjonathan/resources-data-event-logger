import { ResourceEventBody } from '@models/resource-event-body'
import { EventBridge } from 'aws-sdk'

export class EventLogService {
    readonly eventBus = {
        SOURCE_ID: process.env.EVENT_SOURCE_ID || 'local.platform.resource.log',
        NAME: process.env.EVENTBUS_NAME || 'local-handle-resource-data-log-events',
        DETAIL_TYPE: process.env.DETAIL_TYPE || 'LocalResourceDataLog',
    }

    /**
     * putEvent
     */

    private eventBridge(): EventBridge {
        return new EventBridge({
            region: 'us-east-1',
        })
    }

    public async putEvent(eventBody: ResourceEventBody) {
        const eventData = this.prepareEventData(eventBody)
        const resultEvent = await this.eventBridge().putEvents(eventData).promise()
        return resultEvent
    }

    private prepareEventData(eventBody: ResourceEventBody) {
        return {
            Entries: [
                {
                    Source: this.eventBus.SOURCE_ID,
                    EventBusName: this.eventBus.NAME,
                    DetailType: this.eventBus.DETAIL_TYPE,
                    Time: new Date(),
                    Detail: JSON.stringify(eventBody),
                },
            ],
        }
    }
}
