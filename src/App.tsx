import React, { useState } from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import useEventsCalendar, { DisplayMode } from 'use-events-calendar-react'
import { Providers } from './Providers'
import { MonthCalendar } from './MonthCalendar'
import { WeekCalendar } from './WeekCalendar'

const App = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.month)

  const { calendar, calendarEvents } = useEventsCalendar([])

  const { useCalendarEffects, selectDay, today } = calendar

  useCalendarEffects()

  return (
    <Providers events={calendarEvents} calendar={calendar}>
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
