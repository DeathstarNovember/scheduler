import React from 'react'
import { Event } from './useEvents'
import { useCalendar, Day } from './useCalendar'
import { daysAreEqual } from './utils'
import { EventCard } from './EventCard'

type CalendarDayProps = {
  day: Day
  dayName: string
  events: Event[]
  addEvent: (event: Event) => void
  currentDay: Day
  select: (day: Day) => void
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  dayName,
  events,
  addEvent,
  currentDay,
  select,
}) => {
  const { getDayStyle } = useCalendar()

  const selected = daysAreEqual(currentDay.date, day.date)

  const handleClick = () => {
    if (!selected) {
      select(day)
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
        <EventCard key={`event${eventIndex}${dayName}`} event={event} />
      ))}
    </div>
  )
}
