import { EventBridge } from 'aws-sdk'

const eventBridge: EventBridge = new EventBridge({
    region: 'us-east-1',
})

const eventBus = {
    SOURCE_ID: process.env.EVENT_SOURCE_ID || 'local.platform.resource.log',
    NAME: process.env.EVENTBUS_NAME || 'local-handle-resource-data-log-events',
    DETAIL_TYPE: process.env.DETAIL_TYPE || 'LocalResourceDataLog',
}

export { eventBus, eventBridge }
