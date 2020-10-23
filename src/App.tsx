import React from 'react'
import { Event, useEvents } from './useEvents'
import { EventsProvider } from './Providers'
import { MonthCalendar } from './MonthCalendar'

const initialEvents: Event[] = []

const App = () => {
  const { events } = useEvents(initialEvents)

  return (
    <EventsProvider events={events}>
      <MonthCalendar />
    </EventsProvider>
  )
}

export default App
