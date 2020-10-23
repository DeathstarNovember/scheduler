import React from 'react'
import { Month, useCalendar } from './useCalendar'

export const CalendarHeader: React.FC<{
  currentMonth: Month
  currentYear: number
  loadPrevMonth: () => void
  loadNextMonth: () => void
}> = ({ currentYear, currentMonth, loadPrevMonth, loadNextMonth }) => {
  const { getNextMonth, getLastMonth } = useCalendar()
  const nextMonth = getNextMonth(currentMonth)
  const lastMonth = getLastMonth(currentMonth)
  const monthButtonStyle: React.CSSProperties = { cursor: 'pointer' }
  const nextMonthButtonStyle: React.CSSProperties = {
    ...monthButtonStyle,
  }
  const lastMonthButtonStyle: React.CSSProperties = {
    ...monthButtonStyle,
  }
  const currentMonthStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 800,
    margin: '1rem',
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={lastMonthButtonStyle} onClick={loadPrevMonth}>
        {lastMonth.shortName}
      </div>
      <div style={currentMonthStyle}>
        {currentMonth.name} {currentYear}
      </div>
      <div style={nextMonthButtonStyle} onClick={loadNextMonth}>
        {nextMonth.shortName}
      </div>
    </div>
  )
}
