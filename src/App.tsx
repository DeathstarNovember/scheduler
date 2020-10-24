import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Event, useEvents } from './useEvents'
import { Providers } from './Providers'
import { MonthCalendar } from './MonthCalendar'
import { useCalendar } from './useCalendar'
import { WeekCalendar } from './WeekCalendar'

const initialEvents: Event[] = []

const App = () => {
  const calendar = useCalendar()

  const { useCalendarEffects } = calendar

  useCalendarEffects()

  const calendarEvents = useEvents(initialEvents)

  return (
    <Providers events={calendarEvents} calendar={calendar}>
      <Router>
        <Switch>
          <Route path="/month">
            <MonthCalendar />
          </Route>
          <Route path="/week">
            <WeekCalendar />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

export default App
