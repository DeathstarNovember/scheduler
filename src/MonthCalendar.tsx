import React, { useContext } from 'react'
import { useCalendar } from './useCalendar'
import { useEvents } from './useEvents'
import { EventsContext } from './Providers'
import { Layout } from './Layout'
import { CalendarDay } from './CalendarDay'
import { CalendarHeader } from './CalendarHeader'
import { WeekdayHeader } from './WeekdayHeader'
import { CalendarGrid } from './CalendarGrid'

type MonthCalendarProps = {}

export const MonthCalendar: React.FC<MonthCalendarProps> = () => {
  const { events } = useContext(EventsContext)
  const { getDayEvents, addEvent } = useEvents(events)
  const {
    currentDay,
    currentMonth,
    currentYear,
    displayDays,
    selectDay,
    useCalendarEffects,
    loadPrevMonth,
    loadNextMonth,
  } = useCalendar()
  useCalendarEffects()
  return (
    <Layout>
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        loadPrevMonth={loadPrevMonth}
        loadNextMonth={loadNextMonth}
      />
      <WeekdayHeader />
      <CalendarGrid
        gridColumns={7}
        gridRows={displayDays.length / 7}
        gridHeight={`calc(100vh - 9.625rem)`}
      >
        {displayDays.map((day, dayIndex) => {
          const dayEvents = getDayEvents(events, day)
          return (
            <CalendarDay
              day={day}
              dayName={`day${day.date}`}
              events={dayEvents}
              addEvent={addEvent}
              key={`DayDisplay${dayIndex}`}
              select={selectDay}
              currentDay={currentDay}
            />
          )
        })}
      </CalendarGrid>
    </Layout>
  )
}
