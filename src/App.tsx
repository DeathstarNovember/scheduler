import React, { useState } from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Event, useEvents } from './useEvents'
import { Providers } from './Providers'
import { MonthCalendar } from './MonthCalendar'
import { DisplayMode, useCalendar } from './useCalendar'
import { WeekCalendar } from './WeekCalendar'

const initialEvents: Event[] = []

const App = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.month)

  const calendar = useCalendar()

  const { useCalendarEffects, selectDay, today } = calendar

  useCalendarEffects()

  const events = useEvents(initialEvents)

  return (
    <Providers events={events} calendar={calendar}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            cursor: 'pointer',
            padding: 5,
            background:
              displayMode === DisplayMode.month ? 'lightgray' : undefined,
          }}
          onClick={() => setDisplayMode(DisplayMode.month)}
        >
          month
        </div>
        <div
          style={{
            cursor: 'pointer',
            padding: 5,
            background:
              displayMode === DisplayMode.week ? 'lightgray' : undefined,
          }}
          onClick={() => setDisplayMode(DisplayMode.week)}
        >
          week
        </div>
        <div
          style={{
            cursor: 'pointer',
            padding: 5,
          }}
          onClick={() => selectDay(today)}
        >
          today
        </div>
      </div>
      {displayMode === DisplayMode.month ? <MonthCalendar /> : null}
      {displayMode === DisplayMode.week ? <WeekCalendar /> : null}
    </Providers>
  )
}

export default App
