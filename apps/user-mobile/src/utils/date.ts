import dayjs from 'dayjs'

export const formatDate = (date: string | Date, format = 'MM-DD') => {
  return dayjs(date).format(format)
}

export const getDaysDiff = (start: string, end: string) => {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  return endDate.diff(startDate, 'day')
}

export const addDays = (date: string, days: number) => {
  return dayjs(date).add(days, 'day').format('YYYY-MM-DD')
}

export const isValidDate = (date: string) => {
  return dayjs(date).isValid()
}

export const getToday = () => {
  return dayjs().format('YYYY-MM-DD')
}

export const getTomorrow = () => {
  return dayjs().add(1, 'day').format('YYYY-MM-DD')
}

export const isTodayOrAfter = (date: string) => {
  return dayjs(date).isAfter(dayjs().subtract(1, 'day'))
}

export const isWithin3Months = (date: string) => {
  const maxDate = dayjs().add(3, 'month')
  return dayjs(date).isBefore(maxDate) || dayjs(date).isSame(maxDate, 'day')
}