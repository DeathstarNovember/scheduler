import React from 'react'
import { Event } from './useEvents'

export const EventsContext = React.createContext<{
  events: Event[]
}>({
  events: [],
})

export const EventsProvider: React.FC<{
  events: Event[]
}> = ({ events, children }) => {
  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  )
}
