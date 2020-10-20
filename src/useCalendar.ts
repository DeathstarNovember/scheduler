import { useEffect, useState } from "react"

type CSS = React.CSSProperties

type TimePeriodLabel = {
  name: string
  shortName: string
  id: number
}

type Month = TimePeriodLabel

type DayOfWeek = TimePeriodLabel

type Day = {
  date: Date
  weekday: DayOfWeek
  currentPeriod: boolean
}

const months: Month[] = [
  { name: 'January', shortName: 'Jan', id: 0 },
  { name: 'February', shortName: 'Feb', id: 1 },
  { name: 'March', shortName: 'Mar', id: 2 },
  { name: 'April', shortName: 'Apr', id: 3 },
  { name: 'May', shortName: 'May', id: 4 },
  { name: 'June', shortName: 'Jun', id: 5 },
  { name: 'July', shortName: 'Jul', id: 6 },
  { name: 'August', shortName: 'Aug', id: 7 },
  { name: 'September', shortName: 'Sep', id: 8 },
  { name: 'October', shortName: 'Oct', id: 9 },
  { name: 'November', shortName: 'Nov', id: 10 },
  { name: 'December', shortName: 'Dec', id: 11 },
]

const weekdays: DayOfWeek[] = [
  { name: 'Sunday', shortName: 'Sun', id: 0 },
  { name: 'Monday', shortName: 'Mon', id: 1 },
  { name: 'Tuesday', shortName: 'Tue', id: 2 },
  { name: 'Wednesday', shortName: 'Wed', id: 3 },
  { name: 'Thursday', shortName: 'Thr', id: 4 },
  { name: 'Friday', shortName: 'Fri', id: 5 },
  { name: 'Saturday', shortName: 'Sat', id: 6 },
]

const today: Day = {
  date: new Date(),
  weekday: weekdays[new Date().getDay()],
  currentPeriod: true,
}

const getDaysInMonth = (m: Month['id'], y: number) => {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1)
}

const getDays = (month: Month, year: number): Day[] => {
  const daysInCurrentMonth = getDaysInMonth(month.id + 1, year)
  return new Array(daysInCurrentMonth).fill(undefined).map((_, index) => {
    const date = new Date(year, month.id, index + 1)
    return {
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    }
  })
}

type DayStyleOptions = {
  defaultBorderStyle?: CSS['borderStyle']
  defaultBorderWidth?: CSS['borderWidth']
  defaultBorderColor?: CSS['borderColor']
  defaultBackground?: CSS['background']
  defaultTextColor?: CSS['color']
  currentDayBorderWidth?: CSS['borderWidth']
  currentDayBorderColor?: CSS['borderColor']
  currentDayBorderStyle?: CSS['borderStyle']
  currentDayBackground?: CSS['background']
  currentDayTextColor?: CSS['color']
  pastBorderWidth?: CSS['borderWidth']
  pastBorderColor?: CSS['borderColor']
  pastBorderStyle?: CSS['borderStyle']
  pastBackground?: CSS['background']
  pastTextColor?: CSS['color']
  futureBorderWidth?: CSS['borderWidth']
  futureBorderColor?: CSS['borderColor']
  futureBorderStyle?: CSS['borderStyle']
  futureBackground?: CSS['background']
  futureTextColor?: CSS['color']
  todayBorderWidth?: CSS['borderWidth']
  todayBorderColor?: CSS['borderColor']
  todayBorderStyle?: CSS['borderStyle']
  todayBackground?: CSS['background']
  todayTextColor?: CSS['color']
}

const getDayStyle = (
  day: Day,
  currentDay: Day,
  options?: DayStyleOptions,
): CSS => {
  const defaultBorderWidth: CSS['borderWidth'] =
    options?.defaultBorderWidth || '1px'
  const defaultBorderStyle: CSS['borderStyle'] =
    options?.defaultBorderStyle || 'solid'
  const defaultBorderColor: CSS['borderColor'] =
    options?.defaultBorderColor || 'rgba(0,0,0,0)'
  const defaultBackground: CSS['background'] =
    options?.defaultBackground || 'rgba(0,0,0,0)'
  const defaultTextColor: CSS['color'] =
    options?.defaultTextColor || 'rgba(0,0,0,1)'
  const currentDayBorderStyle: CSS['borderStyle'] =
    options?.currentDayBorderStyle || defaultBorderStyle
  const currentDayBorerWidth: CSS['borderWidth'] =
    options?.currentDayBorderWidth || defaultBorderWidth
  const currentDayBorderColor: CSS['borderColor'] =
    options?.currentDayBorderColor || 'rgba(0,0,225, 1)'
  const currentDayBackground: CSS['background'] =
    options?.currentDayBackground || 'rgba(0, 105, 225, 0.75)'
  const currentDayTextColor: CSS['color'] =
    options?.currentDayTextColor || 'rgb(178, 198, 221)'
  const pastBorderStyle: CSS['borderStyle'] =
    options?.pastBorderStyle || defaultBorderStyle
  const pastBorderWidth: CSS['borderWidth'] =
    options?.pastBorderWidth || defaultBorderWidth
  const pastBorderColor: CSS['borderColor'] =
    options?.pastBorderColor || defaultBorderColor
  const pastBackground: CSS['background'] =
    options?.pastBackground || defaultBackground
  const pastTextColor: CSS['color'] = options?.pastTextColor || defaultTextColor
  const futureBorderStyle: CSS['borderStyle'] =
    options?.futureBorderStyle || defaultBorderStyle
  const futureBorderWidth: CSS['borderWidth'] =
    options?.futureBorderWidth || defaultBorderWidth
  const futureBorderColor: CSS['borderColor'] =
    options?.futureBorderColor || defaultBorderColor
  const futureBackground: CSS['background'] =
    options?.futureBackground || defaultBackground
  const futureTextColor: CSS['color'] =
    options?.futureTextColor || defaultTextColor
  const todayBorderStyle: CSS['borderStyle'] =
    options?.todayBorderStyle || defaultBorderStyle
  const todayBorderWidth: CSS['borderWidth'] =
    options?.todayBorderWidth || defaultBorderWidth
  const todayBorderColor: CSS['borderColor'] =
    options?.todayBorderColor || 'rgba(255,0,0,1)'
  const todayBackground: CSS['background'] =
    options?.todayBackground || 'rgba(255, 119, 119, 0.75)'
  const todayTextColor: CSS['color'] =
    options?.todayTextColor || 'rgb(255, 220, 220)'

  const styles: CSS = {}
  const getDaysSinceBOT = (date: Date) => {
    const intDate = new Date(date)
    intDate.setHours(0, 0, 0, 0)
    return Math.floor(Number(intDate) / 86400000)
  }
  const isToday = getDaysSinceBOT(day.date) === getDaysSinceBOT(today.date)
  const isCurrentDay =
    getDaysSinceBOT(day.date) === getDaysSinceBOT(currentDay.date)
  const isPast = getDaysSinceBOT(day.date) < getDaysSinceBOT(today.date)

  if (isPast) {
    styles['borderStyle'] = pastBorderStyle
    styles['borderColor'] = pastBorderColor
    styles['borderWidth'] = pastBorderWidth
    styles['background'] = pastBackground
    styles['color'] = pastTextColor
  }
  if (isCurrentDay) {
    styles['borderStyle'] = currentDayBorderStyle
    styles['borderColor'] = currentDayBorderColor
    styles['borderWidth'] = currentDayBorerWidth
    styles['background'] = currentDayBackground
    styles['color'] = currentDayTextColor
  } else {
    styles['borderWidth'] = futureBorderWidth
    styles['borderColor'] = futureBorderColor
    styles['borderStyle'] = futureBorderStyle
    styles['background'] = futureBackground
    styles['color'] = futureTextColor
  }
  if (isToday) {
    styles['borderStyle'] = todayBorderStyle
    styles['borderColor'] = todayBorderColor
    styles['borderWidth'] = todayBorderWidth
    styles['background'] = isCurrentDay ? currentDayBackground : todayBackground
    styles['color'] = todayTextColor
  }
  return styles
}

const getPrevMonthDisplayDays = (month: Month, year: number): Day[] => {
  const firstOfCurrentMonth = new Date(year, month.id, 1)
  const prevMonthYear = month.id === 0 ? year - 1 : year;
  return new Array(firstOfCurrentMonth.getDay())
    .fill(undefined)
    .map((_udf, index) => {
      const date = new Date(prevMonthYear, month.id, 0 - index)
      return { date, weekday: weekdays[date.getDay()], currentPeriod: false }
    })
    .reverse()
}
const getNextMonthDisplayDays = (month: Month, year: number): Day[] => {
  const nextMonthId = (month.id + 1) % 12
  const nextMonthYear = month.id === 11 ? year + 1 : year
  const lastOfCurrentMonth = new Date(nextMonthYear, nextMonthId, 0)
  return new Array(6 - lastOfCurrentMonth.getDay())
    .fill(undefined)
    .map((_udf, index) => {
      const date = new Date(year, nextMonthId, index + 1)
      return { date, weekday: weekdays[date.getDay()], currentPeriod: false }
    })
}

const getNextMonth = (thisMonth: Month) =>
  months.find((month) => month.id === (thisMonth.id + 1) % 12) || months[1]

const getLastMonth = (thisMonth: Month) =>
  months.find((month) => (month.id = thisMonth.id - 1)) || months[11]

export const useCalendar = () => {
  const [currentDay, setCurrentDay] = useState(today)

  const [currentYear, setCurrentYear] = useState(today.date.getFullYear())

  const [currentMonth, setCurrentMonth] = useState(
    months[today.date.getMonth()],
  )

  const [currentMonthDays, setCurrentMonthDays] = useState(
    getDays(currentMonth, currentYear),
  )

  const [prevMonthDays, setPrevMonthDays] = useState(
    getPrevMonthDisplayDays(currentMonth, currentYear),
  )

  const [nextMonthDays, setNextMonthDays] = useState(
    getNextMonthDisplayDays(currentMonth, currentYear),
  )

  const [displayDays, setDisplayDays] = useState([
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ])

  const loadPrevMonth = () => {
    const date = new Date(
      currentMonth.id === 0 ? currentYear - 1 : currentYear,
      getLastMonth(currentMonth).id,
      currentDay.date.getDate(),
    )
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadNextMonth = () => {
    const date = new Date(
      currentMonth.id === 11 ? currentYear + 1 : currentYear,
      getNextMonth(currentMonth).id,
      currentDay.date.getDate(),
    )
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const selectDay = (day: Day) => {
    setCurrentDay(day)
  }

  const useCalendarEffects = () =>  useEffect(() => {
    setCurrentMonth(months[currentDay.date.getMonth()])
    setCurrentYear(currentDay.date.getFullYear())
    setCurrentMonthDays(
      getDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setPrevMonthDays(
      getPrevMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setNextMonthDays(
      getNextMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setDisplayDays([
      ...getPrevMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getNextMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    ])
  }, [currentDay])

  return {
    currentDay,
    currentMonth,
    currentYear,
    loadPrevMonth,
    loadNextMonth,
    weekdays,
    displayDays,
    getDayStyle,
    selectDay,
    useCalendarEffects
  }
}
