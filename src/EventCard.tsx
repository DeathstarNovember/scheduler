import React, { useState } from 'react'
import { EventForm } from './EventForm'
import { Event } from './useEvents'

type EventCardProps = {
  event: Event
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [formVisible, setFormVisible] = useState(false)

  return formVisible ? (
    <EventForm
      event={event}
      visible={formVisible}
      hideForm={() => setFormVisible(false)}
    />
  ) : (
    <div onClick={() => setFormVisible(true)}>
      {event.title}
      {event.description}
    </div>
  )
}
