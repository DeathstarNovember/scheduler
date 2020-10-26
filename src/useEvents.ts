import { useState } from "react"
import { Day, Month } from "./useCalendar"
import { daysAreEqual } from "./utils"

export type Event = {
  id: string
  title: string
  allDay: boolean
  description?: string
  startDate: Date
  endDate: Date
  startTimeHours: number
  startTimeMinutes: number
  endTimeHours: number
  endTimeMinutes: number
}

export type NewEvent = Omit<Event, "id">

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

const getHourEvents = (events: Event[], start: Date) => {
  return events.filter((event) => {
    return daysAreEqual(event.startDate, start) && event.startTimeHours === start.getHours()
  })
}

export const useEvents = (initialEvents?: Event[]) => {
  const [events, setEvents] = useState<Event[]>(initialEvents || []);

  const addEvent = (newEvent: NewEvent) => {
    setEvents(
      [...events, {...newEvent, id: Date.now().toString()}]
    )
  }

  const updateEvent = (event: Event) => {
    const eventToReplace = events.find(e => e.id === event.id);

    if (!eventToReplace) throw new Error(`event with id ${event.id} does not exist.`)

    setEvents([...events.filter(e => e.id !== event.id), event])
  }

  const deleteEvent = (event: Event) => {
    const newEvents = events.filter(e => e.id !== event.id)

    setEvents(newEvents);
  } 

  const calendarEvents: Events = {
    events,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getHourEvents,
    getDayEvents,
    getMonthEvents
  }

  return calendarEvents
}

export type Events = {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  addEvent: (event: NewEvent) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;
  getHourEvents: (events: Event[], start: Date) => Event[];
  getDayEvents: (events: Event[], day: Day) => Event[];
  getMonthEvents: (events: Event[], month: Month, year: number) => Event[];
}

export const defaultEvents: Events = {
  events: [],
  setEvents: () => { },
  addEvent: () => { },
  updateEvent: () => { },
  deleteEvent: () => { },
  getHourEvents: () => ([]),
  getDayEvents: () => ([]),
  getMonthEvents: () => ([]),
}
