import { useEffect, useState } from "react"
import { differenceInDays, getDaysSinceBOT } from "./utils"

type CSS = React.CSSProperties

type TimePeriodLabel = {
  name: string
  shortName: string
  id: number
}

export type Month = TimePeriodLabel

export type DayOfWeek = TimePeriodLabel

export type Day = {
  date: Date
  weekday: DayOfWeek
  currentPeriod: boolean
}

export type Week = {
  id: number;
  firstDay: Date;
}

export const months: Month[] = [
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

export const weekdays: DayOfWeek[] = [
  { name: 'Sunday', shortName: 'Sun', id: 0 },
  { name: 'Monday', shortName: 'Mon', id: 1 },
  { name: 'Tuesday', shortName: 'Tue', id: 2 },
  { name: 'Wednesday', shortName: 'Wed', id: 3 },
  { name: 'Thursday', shortName: 'Thr', id: 4 },
  { name: 'Friday', shortName: 'Fri', id: 5 },
  { name: 'Saturday', shortName: 'Sat', id: 6 },
]

export const msInAMinute = 60000

export const msInAnHour = msInAMinute * 60;

export const msInADay = msInAnHour * 24

export const msInAWeek = msInADay * 7

export const today: Day = {
  date: new Date(),
  weekday: weekdays[new Date().getDay()],
  currentPeriod: true,
}

const getDaysInMonth = (monthId: Month['id'], y: number) => {
  const m = monthId + 1
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1)
}

export const getWeekDays = (day: Date): Day[] => {
  const week = getWeekByDate(day)

  return new Array(7).fill(undefined).map((_udf, index) => {
    const date = new Date(Number(week.firstDay) + (index * msInADay))

    return {
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: false
    }
  })
}

const getMonthDays = (month: Month, year: number): Day[] => {
  const daysInCurrentMonth = getDaysInMonth(month.id, year)

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
  defaultFontSize?: CSS['fontSize']
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
  pastFontWeight?: CSS["fontWeight"]
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
  
  const defaultFontWeight: CSS['fontWeight'] = 500

  const defaultFontSize: CSS['fontSize'] = "1.5rem"
  
  const currentDayBorderStyle: CSS['borderStyle'] =
    options?.currentDayBorderStyle || defaultBorderStyle
  
  const currentDayBorerWidth: CSS['borderWidth'] =
    options?.currentDayBorderWidth || defaultBorderWidth
  
  const currentDayBorderColor: CSS['borderColor'] =
    options?.currentDayBorderColor || 'rgba(0,0,225, 1)'
  
  const currentDayBackground: CSS['background'] =
    options?.currentDayBackground || 'rgba(0, 105, 225, 0.75)'
  
  const currentDayTextColor: CSS['color'] =
    options?.currentDayTextColor || '#1A237E'
  
  const pastBorderStyle: CSS['borderStyle'] =
    options?.pastBorderStyle || defaultBorderStyle
  
  const pastBorderWidth: CSS['borderWidth'] =
    options?.pastBorderWidth || defaultBorderWidth
  
  const pastBorderColor: CSS['borderColor'] =
    options?.pastBorderColor || defaultBorderColor
  
  const pastBackground: CSS['background'] =
    options?.pastBackground || defaultBackground
  
  const pastTextColor: CSS['color'] = options?.pastTextColor || defaultTextColor

  const pastFontWeight: CSS['fontWeight'] = options?.pastFontWeight || defaultFontWeight

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
    options?.todayTextColor || '#880E4F'

  const styles: CSS = {}
  
  const isToday = getDaysSinceBOT(day.date) === getDaysSinceBOT(today.date)

  const isCurrentDay =
    getDaysSinceBOT(day.date) === getDaysSinceBOT(currentDay.date)
  
  const isPast = getDaysSinceBOT(day.date) < getDaysSinceBOT(today.date)

  styles['fontSize'] = defaultFontSize;

  if (isPast) {
    styles['borderStyle'] = pastBorderStyle
    styles['borderColor'] = pastBorderColor
    styles['borderWidth'] = pastBorderWidth
    styles['background'] = pastBackground
    styles['color'] = pastTextColor
    styles['fontWeight'] = pastFontWeight
  }

  if (isCurrentDay) {
    styles['borderStyle'] = currentDayBorderStyle
    styles['borderColor'] = currentDayBorderColor
    styles['borderWidth'] = currentDayBorerWidth
    styles['background'] = currentDayBackground
    styles['color'] = currentDayTextColor
  }

  if(!isPast && !isCurrentDay) {
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



const getMonthFromDate = (date: Date): Month => {
  return months[date.getMonth()]
}

// const getFirstDayOfYear = (year: number): Date => {
//   return new Date(year, 0, 1)
// }

// const getLastDayOfYear = (year: number): Date => {
//   return new Date(year, 11, 31)
// }

const getFirstDayOfWeek = (date: Date) => {
  return new Date(Number(date) - (date.getDay() * msInADay))
}

// const getFirstWeekOfYear = (year: number): Week => {
//   const firstDayOfYear = getFirstDayOfYear(year);

//   const firstDayOfWeek = getFirstDayOfWeek(firstDayOfYear);

//   return {
//     id: 0,
//     firstDay: firstDayOfWeek
//   }
// }

// const getWeekdayFromWeek = (week: Week, weekday: DayOfWeek): Day => {
//   return {
//     date: new Date(Number(week.firstDay) + (weekday.id * msInADay)),
//     weekday, 
//     currentPeriod: false
//   }
// }

const getWeekNumber = (date: Date) => {
  // Thursday in current week decides the year.
  // January 4 is always in week 1.
  const firstDayOfWeek = getFirstDayOfWeek(date)

  const jan4 = new Date(firstDayOfWeek.getFullYear(), 0, 4);

  const firstDayOfWeek1 = getFirstDayOfWeek(jan4);
  
  // Count number of weeks from week1 to current week.
  return Math.floor((differenceInDays(firstDayOfWeek1, firstDayOfWeek)) / 7) +1;
}

export const getWeekByDate = (date: Date): Week => {
  const firstDayOfWeek = getFirstDayOfWeek(date);
  return {
    id: getWeekNumber(date),
    firstDay: firstDayOfWeek
  }
}

export enum DisplayMode {
  month,
  week,
  day
}

export const useCalendar = (selectedDay?: Day) => {
  const [currentDay, setCurrentDay] = useState(selectedDay || today)

  const [currentWeek, setCurrentWeek] = useState(getWeekByDate(currentDay.date))

  const [currentYear, setCurrentYear] = useState(currentDay.date.getFullYear())

  const [currentMonth, setCurrentMonth] = useState(
    months[currentDay.date.getMonth()],
  )

  const [currentMonthDays, setCurrentMonthDays] = useState(
    getMonthDays(currentMonth, currentYear),
  )
  
  const [weekDisplayDays, setWeekDisplayDays] = useState(
    getWeekDays(currentDay.date),
  )

  const [prevMonthDays, setPrevMonthDays] = useState(
    getPrevMonthDisplayDays(currentMonth, currentYear),
  )

  const [nextMonthDays, setNextMonthDays] = useState(
    getNextMonthDisplayDays(currentMonth, currentYear),
  )

  const [monthDisplayDays, setMonthDisplayDays] = useState([
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ])

  const getNextWeek = () => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) + msInAWeek))
  }
  const getLastWeek = () => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) - msInAWeek))
  }

  const getNextMonth = () =>
  months.find((month) => month.id === (currentMonth.id + 1) % 12) || months[1]

const getLastMonth = () =>
  months.find((month) => (month.id === currentMonth.id - 1)) || months[11]


  const loadPrevMonth = () => {
    const date = new Date(
      currentDay.date.getMonth() === 0 ? currentDay.date.getFullYear() - 1 : currentDay.date.getFullYear(),
      getLastMonth().id,
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
      currentDay.date.getMonth() === 11 ? currentDay.date.getFullYear() + 1 : currentDay.date.getFullYear(),
      getNextMonth().id,
      currentDay.date.getDate(),
    )
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadPrevWeek = () => {
    const date = new Date(Number(currentDay.date) - msInAWeek)
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadNextWeek = () => {
    const date = new Date(Number(currentDay.date) + msInAWeek)
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const selectDay = (day: Day) => {
    setCurrentDay(day)
  }

  const useCalendarEffects = () => useEffect(() => {
    setCurrentWeek(getWeekByDate(currentDay.date))
    setWeekDisplayDays(getWeekDays(getFirstDayOfWeek(currentDay.date)))
    setCurrentMonth(months[currentDay.date.getMonth()])
    setCurrentYear(currentDay.date.getFullYear())
    setCurrentMonthDays(
      getMonthDays(
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
    setMonthDisplayDays([
      ...getPrevMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getMonthDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getNextMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    ])
  }, [currentDay])

  const calendar: Calendar = {
    weekdays,
    currentDay,
    currentWeek,
    currentYear,
    currentMonth,
    monthDisplayDays,
    weekDisplayDays,
    selectDay,
    getDayStyle,
    getNextWeek,
    getLastWeek,
    loadPrevWeek,
    loadNextWeek,
    getLastMonth,
    getNextMonth,
    loadPrevMonth,
    loadNextMonth,
    getWeekByDate,
    useCalendarEffects,
  }

  return calendar
}

export type Calendar = {
  weekdays: DayOfWeek[],
    currentDay: Day,
    currentWeek: Week,
    currentYear: number,
    currentMonth: Month,
    monthDisplayDays: Day[],
    weekDisplayDays: Day[],
    selectDay: (day: Day) => void,
    getDayStyle: (day: Day, currentDay: Day, options?: DayStyleOptions | undefined) => CSS,
    getNextWeek: () => Week,
    getLastWeek: () => Week,
    loadPrevWeek: () => void,
    loadNextWeek: () => void,
    getLastMonth: () => Month,
    getNextMonth: () => Month,
    loadPrevMonth: () => void,
    loadNextMonth: () => void,
    getWeekByDate: (date: Date) => Week,
    useCalendarEffects: () => void,
}

export const defaultCalendar: Calendar = {
  weekdays,
  currentDay: today,
  currentWeek: getWeekByDate(today.date),
  currentYear: today.date.getFullYear(),
  currentMonth: months[today.date.getMonth()],
  monthDisplayDays: getMonthDays(months[today.date.getMonth()], today.date.getFullYear()),
  weekDisplayDays: getWeekDays(today.date),
  selectDay: () => { },
  getDayStyle: () => {return {} },
  getNextWeek: () => {return getWeekByDate(new Date(Number(today.date) + msInAWeek))},
  getLastWeek: () => {return getWeekByDate(new Date(Number(today.date) - msInAWeek))},
  loadPrevWeek: () => { },
  loadNextWeek: () => { },
  getLastMonth: () => {return getMonthFromDate(new Date(Number(today.date) - msInADay * getDaysInMonth(today.date.getMonth(), today.date.getFullYear()))) },
  getNextMonth: () => {return getMonthFromDate(new Date(Number(today.date) + msInADay * getDaysInMonth(today.date.getMonth(), today.date.getFullYear()))) },
  loadPrevMonth: () => { },
  loadNextMonth: () => { },
  getWeekByDate,
  useCalendarEffects: () => { },
}
