import React from 'react'
import { useCalendar } from './useCalendar'

function App() {
  const {
    currentDay,
    currentMonth,
    currentYear,
    loadPrevMonth,
    loadNextMonth,
    weekdays,
    displayDays,
    getDayStyle,
    selectDay,
    useCalendarEffects,
  } = useCalendar()

  useCalendarEffects()
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>
        {currentMonth.name} {currentYear}
      </h1>
      <div>
        <button onClick={loadPrevMonth}>Prev</button>
        <button onClick={loadNextMonth}>Next</button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: '3rem',
        }}
      >
        {weekdays.map((weekday, weekdayIndex) => (
          <div
            key={`weekdayLabel${weekdayIndex}`}
            style={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {weekday.shortName}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: 'calc(100vh - 3rem - 6.34em )',
        }}
      >
        {displayDays.map((day, dayIndex) => {
          return (
            <div
              key={`day${dayIndex}`}
              style={getDayStyle(day, currentDay)}
              onClick={() => selectDay(day)}
            >
              {day.date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
