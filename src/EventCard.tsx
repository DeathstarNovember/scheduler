import React, { useState } from 'react'
import { EventForm } from './EventForm'
import { CalendarEvent } from 'use-events-calendar-react'

type EventCardProps = {
  event: CalendarEvent
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
    <div
      style={{ fontSize: '1rem', cursor: 'pointer' }}
      onClick={() => setFormVisible(true)}
    >
      {event.title}
      {event.description}
    </div>
  )
}
