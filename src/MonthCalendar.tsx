import React, { useContext } from 'react'
import { CalendarContext } from './Providers'
import { Layout } from './Layout'
import { CalendarDay } from './CalendarDay'
import { MonthlyCalendarHeader } from './CalendarHeader'
import { WeekdayHeader } from './WeekdayHeader'
import { CalendarGrid } from './CalendarGrid'

type MonthCalendarProps = {}

export const MonthCalendar: React.FC<MonthCalendarProps> = () => {
  const {
    calendar: { monthDisplayDays },
  } = useContext(CalendarContext)

  return (
    <Layout>
      <MonthlyCalendarHeader />
      <WeekdayHeader />
      <CalendarGrid
        gridColumns={7}
        gridRows={monthDisplayDays.length / 7}
        gridHeight={`calc(100vh - 9.625rem)`}
      >
        {monthDisplayDays.map((day, dayIndex) => {
          return <CalendarDay day={day} key={`DayDisplay${dayIndex}`} />
        })}
      </CalendarGrid>
    </Layout>
  )
}
