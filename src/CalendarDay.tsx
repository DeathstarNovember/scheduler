import React, { useContext } from 'react'
import { Day } from './useCalendar'
import { daysAreEqual } from './utils'
import { EventCard } from './EventCard'
import { CalendarContext, EventsContext } from './Providers'

type CalendarDayProps = {
  day: Day
}

export const CalendarDay: React.FC<CalendarDayProps> = ({ day }) => {
  const {
    calendar: { currentDay, selectDay, getDayStyle },
  } = useContext(CalendarContext)

  const {
    events: { events, addEvent },
  } = useContext(EventsContext)

  const selected = daysAreEqual(currentDay.date, day.date)

  const handleClick = () => {
    if (!selected) {
      console.warn({ day })
      selectDay(day)
    }
  }

  const handleAddEvent = () => {
    addEvent({ title: 'New Event', startDate: day.date })
  }

  const dayStyles: React.CSSProperties = getDayStyle(day, currentDay, {
    pastFontWeight: 200,
    pastTextColor: '#868686',
  })

  return (
    <div style={dayStyles} onClick={handleClick}>
      <div style={{ display: 'flex' }}>
        {day.date.getDate()}
        <div onClick={handleAddEvent} style={{ cursor: 'pointer' }}>
          +
        </div>
      </div>
      {events.map((event, eventIndex) => (
        <EventCard
          key={`event${eventIndex}${currentDay.weekday.name}`}
          event={event}
        />
      ))}
    </div>
  )
}
