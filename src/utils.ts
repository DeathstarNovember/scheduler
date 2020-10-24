export const getDaysSinceBOT = (date: Date) => {
  const intDate = new Date(date)
  intDate.setHours(0, 0, 0, 0)
  return Math.floor(Number(intDate) / 86400000)
}

export const daysAreEqual = (day1: Date, day2: Date) => {
  return getDaysSinceBOT(day1) === getDaysSinceBOT(day2)
} 

export const differenceInDays = (day1: Date, day2: Date) => {
  return getDaysSinceBOT(day2) - getDaysSinceBOT(day1)
}
