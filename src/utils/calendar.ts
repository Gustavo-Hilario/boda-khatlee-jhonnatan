export function generateGoogleCalendarUrl(
  title: string,
  startDate: Date,
  endDate: Date,
  description: string,
  location: string
): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '').slice(0, 15) + 'Z'
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: description,
    location: location,
    sf: 'true',
    output: 'xml',
  })

  return `https://www.google.com/calendar/render?${params.toString()}`
}

export function getWeddingCalendarUrl(): string {
  const startDate = new Date('2026-03-07T21:00:00Z') // 4pm Peru time (UTC-5)
  const endDate = new Date('2026-03-08T05:00:00Z') // 12am next day Peru time

  return generateGoogleCalendarUrl(
    'Boda de Khatlee & Jhonatan',
    startDate,
    endDate,
    'Acompananos en nuestro gran dia!',
    'Lima, Peru'
  )
}
