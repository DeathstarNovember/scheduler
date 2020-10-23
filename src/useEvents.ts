import { useState } from "react"
import { Day, Month } from "./useCalendar"
import { daysAreEqual, getDaysSinceBOT } from "./utils"

export type Event = {
  title: string
  description?: string
  startDate: Date
  endDate?: Date
  startTimeHours?: number
  startTimeMinutes?: number
  endTimeHours?: number
  endTimeMinutes?: number
}

const getMonthEvents = (events: Event[], month: Month, year: number) => {
  const eventMonth = (event: Event) => event.startDate.getMonth()
  const eventYear = (event: Event) => event.startDate.getFullYear()
  return events.filter(
    (event) => eventMonth(event) === month.id && eventYear(event) === year,
  )
}
const getDayEvents = (events: Event[], day: Day) => {
  return events.filter((event) => daysAreEqual(event.startDate, day.date))
}

export const useEvents = (initialEvents?: Event[]) => {
  const [events, setEvents] = useState<Event[]>(initialEvents || []);

  const addEvent = (event: Event) => {
    setEvents(
      [...events, event].sort(
        (ea, eb) =>
          getDaysSinceBOT(eb.startDate) - getDaysSinceBOT(ea.startDate),
      ),
    )
  }

  return {events, setEvents, addEvent, getDayEvents, getMonthEvents}
}
