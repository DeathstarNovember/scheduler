import React from 'react'
import { Calendar, defaultCalendar } from './useCalendar'
import { defaultEvents, Events } from './useEvents'

type ProvidersProps = {
  events: Events
  calendar: Calendar
}

export const Providers: React.FC<ProvidersProps> = ({
  events,
  calendar,
  children,
}) => {
  return (
    <EventsProvider events={events}>
      <CalendarProvider calendar={calendar}>{children}</CalendarProvider>
    </EventsProvider>
  )
}

export const EventsContext = React.createContext<{
  events: Events
}>({
  events: defaultEvents,
})

export const EventsProvider: React.FC<{
  events: Events
}> = ({ events, children }) => {
  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  )
}

export const CalendarContext = React.createContext<{
  calendar: Calendar
}>({ calendar: defaultCalendar })

export const CalendarProvider: React.FC<{
  calendar: Calendar
}> = ({ calendar, children }) => {
  return (
    <CalendarContext.Provider value={{ calendar }}>
      {children}
    </CalendarContext.Provider>
  )
}
