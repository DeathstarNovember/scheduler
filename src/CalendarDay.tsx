import React, { useContext, useRef } from 'react'
import { Day } from './useCalendar'
import { daysAreEqual } from './utils'
import { EventCard } from './EventCard'
import { CalendarContext, EventsContext } from './Providers'

type CalendarDayProps = {
  day: Day
  showHours?: boolean
}

type Hour = {
  h24: number
  h12: number
}

const hours: Hour[] = new Array(24)
  .fill(0)
  .map((_, index) => ({ h24: index, h12: index % 12 }))

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  showHours = false,
}) => {
  const {
    calendar: { currentDay, selectDay, getDayStyle },
  } = useContext(CalendarContext)

  const {
    events: { events, addEvent, getDayEvents },
  } = useContext(EventsContext)

  const dayEvents = getDayEvents(events, day)

  const selected = daysAreEqual(currentDay.date, day.date)

  const dayTileRef = useRef<HTMLDivElement>(null)

  const dayHeaderRef = useRef<HTMLDivElement>(null)

  const hoursHeight =
    (dayTileRef.current?.scrollHeight || 0) -
    (dayHeaderRef.current?.scrollHeight || 0)

  const dayStyles: React.CSSProperties = getDayStyle(day, currentDay, {
    pastFontWeight: 200,
    pastTextColor: '#868686',
  })

  const handleClick = () => {
    if (!selected) {
      selectDay(day)
    }
  }

  const handleAddEvent = () => {
    addEvent({ title: 'New Event', startDate: day.date })
  }

  return (
    <div style={dayStyles} onClick={handleClick} ref={dayTileRef}>
      <div style={{ display: 'flex' }} ref={dayHeaderRef}>
        {day.date.getDate()}
        {!showHours && selected ? (
          <div onClick={handleAddEvent} style={{ cursor: 'pointer' }}>
            +
          </div>
        ) : null}
      </div>
      {showHours ? (
        <div
          style={{
            height: `${hoursHeight}px`,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(24, 1fr)',
          }}
        >
          {hours.map((hour) => {
            return (
              <HourTile
                key={`event${hour.h24}${currentDay.weekday.name}`}
                day={day}
                hour={hour}
              />
            )
          })}
        </div>
      ) : (
        <div>
          {dayEvents.map((event, eventIndex) => (
            <EventCard
              key={`event${eventIndex}${currentDay.weekday.name}`}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const HourTile: React.FC<{
  day: Day
  hour: Hour
}> = ({ hour, day }) => {
  const {
    calendar: { currentDay },
  } = useContext(CalendarContext)
  const daySelected = daysAreEqual(day.date, currentDay.date)
  const {
    events: { events: allEvents, addEvent, getHourEvents },
  } = useContext(EventsContext)
  const start = new Date(
    day.date.getFullYear(),
    day.date.getMonth(),
    day.date.getDate(),
    hour.h24,
    0,
    0,
  )
  const events = getHourEvents(allEvents, start)
  const handleAddEvent = () => {
    addEvent({ title: 'New Event', startDate: start })
  }
  return (
    <div style={{ borderBottom: 'solid gray 1px' }}>
      <div style={{ display: 'flex' }}>
        {hour.h24}
        {daySelected ? (
          <div onClick={handleAddEvent} style={{ cursor: 'pointer' }}>
            +
          </div>
        ) : null}
      </div>
      {events.map((event, eventIndex) => (
        <EventCard
          key={`event${eventIndex}${day.weekday.name}`}
          event={event}
        />
      ))}
    </div>
  )
}
