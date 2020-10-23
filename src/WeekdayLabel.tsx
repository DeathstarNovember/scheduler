import React from 'react'
import { DayOfWeek } from './useCalendar'

export const WeekdayLabel: React.FC<{ weekday: DayOfWeek }> = ({ weekday }) => {
  return (
    <div
      key={`weekdayLabel${weekday.id}`}
      style={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        fontSize: '2rem',
      }}
    >
      {weekday.shortName}
    </div>
  )
}
