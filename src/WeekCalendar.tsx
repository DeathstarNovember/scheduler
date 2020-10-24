import React, { useContext } from 'react'
import { CalendarDay } from './CalendarDay'
import { CalendarGrid } from './CalendarGrid'
import { WeeklyCalendarHeader } from './CalendarHeader'
import { Layout } from './Layout'
import { CalendarContext } from './Providers'
import { WeekdayHeader } from './WeekdayHeader'

export const WeekCalendar: React.FC = () => {
  const {
    calendar: { weekDisplayDays },
  } = useContext(CalendarContext)

  return (
    <Layout>
      <WeeklyCalendarHeader />
      <WeekdayHeader />
      <CalendarGrid
        gridColumns={7}
        gridRows={1}
        gridHeight={`calc(100vh - 9.625rem)`}
      >
        {weekDisplayDays.map((day, dayIndex) => {
          return (
            <CalendarDay
              day={day}
              key={`DayDisplay${dayIndex}`}
              showHours={true}
            />
          )
        })}
      </CalendarGrid>
    </Layout>
  )
}
