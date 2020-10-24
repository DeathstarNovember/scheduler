import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Event, useEvents } from './useEvents'
import { Providers } from './Providers'
import { MonthCalendar } from './MonthCalendar'
import { DisplayMode, useCalendar } from './useCalendar'
import { WeekCalendar } from './WeekCalendar'

const initialEvents: Event[] = []

const App = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.month)

  const calendar = useCalendar()

  const { useCalendarEffects } = calendar

  useCalendarEffects()

  const calendarEvents = useEvents(initialEvents)

  return (
    <Providers events={calendarEvents} calendar={calendar}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            padding: 5,
            background:
              displayMode === DisplayMode.month ? 'lightray' : undefined,
          }}
          onClick={() => setDisplayMode(DisplayMode.month)}
        >
          month
        </div>
        <div
          style={{
            padding: 5,
            background:
              displayMode === DisplayMode.week ? 'lightray' : undefined,
          }}
          onClick={() => setDisplayMode(DisplayMode.week)}
        >
          week
        </div>
      </div>
      {displayMode === DisplayMode.month ? <MonthCalendar /> : null}
      {displayMode === DisplayMode.week ? <WeekCalendar /> : null}
    </Providers>
  )
}

export default App
