import { ResourceEventBody } from '@models/resource-event-body'

export class EventLogService {
    public async putEvent(eventBody: ResourceEventBody) {
        return {
            FailedEntryCount: 0,
            Entries: [
                {
                    EventId: '94f34661-daf9-a944-9b4a-787653358a74',
                },
            ],
        }
    }
}
