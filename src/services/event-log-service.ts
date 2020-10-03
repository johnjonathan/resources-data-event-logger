import { ResourceEventBody } from '@models/resource-event-body'
import { eventBus, eventBridge } from '@config/event-bus'

export class EventLogService {
    /**
     * putEvent
     */
    public async putEvent(eventBody: ResourceEventBody) {
        const eventData = this.prepareEventData(eventBody)
        const resultEvent = await eventBridge.putEvents(eventData).promise()
        return resultEvent
    }

    private prepareEventData(eventBody: ResourceEventBody) {
        return {
            Entries: [
                {
                    Source: eventBus.SOURCE_ID,
                    EventBusName: eventBus.NAME,
                    DetailType: eventBus.DETAIL_TYPE,
                    Time: new Date(),
                    Detail: JSON.stringify(eventBody),
                },
            ],
        }
    }
}
