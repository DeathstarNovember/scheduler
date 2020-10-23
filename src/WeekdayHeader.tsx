import React from 'react'
import { useCalendar } from './useCalendar'
import { WeekdayLabel } from './WeekdayLabel'

export const WeekdayHeader: React.FC = () => {
  const { weekdays } = useCalendar()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '1rem',
      }}
    >
      {weekdays.map((weekday, weekdayIndex) => (
        <WeekdayLabel weekday={weekday} key={`weekdayLabel${weekdayIndex}`} />
      ))}
    </div>
  )
}
