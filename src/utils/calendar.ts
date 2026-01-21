import { weddingConfig, timelineEvents } from '../config/wedding'

export function generateGoogleCalendarUrl(
    title: string,
    startDate: Date,
    endDate: Date,
    description: string,
    location: string
): string {
    const formatDate = (date: Date) => {
        return (
            date
                .toISOString()
                .replace(/-|:|\.\d{3}/g, '')
                .slice(0, 15) + 'Z'
        );
    };

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
        details: description,
        location: location,
        sf: 'true',
        output: 'xml',
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
}

const GMT_MINUS_5_TZ = 'Etc/GMT+5'

function getDatePartGmtMinus5(date: Date): string {
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: GMT_MINUS_5_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    return formatter.format(date)
}

function parseTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

function getTimeMinutesGmtMinus5(date: Date): number {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: GMT_MINUS_5_TZ,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
    const parts = formatter.formatToParts(date)
    const hours = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
    const minutes = Number(parts.find((part) => part.type === 'minute')?.value ?? 0)
    return hours * 60 + minutes
}

function addDaysGmtMinus5(datePart: string, days: number): string {
    const base = new Date(`${datePart}T00:00:00-05:00`)
    const next = new Date(base.getTime() + days * 24 * 60 * 60 * 1000)
    return getDatePartGmtMinus5(next)
}

export function getWeddingCalendarUrl(): string {
    const startDate = weddingConfig.date
    const datePart = getDatePartGmtMinus5(startDate)
    const startTimeMinutes = getTimeMinutesGmtMinus5(startDate)
    const lastEvent = timelineEvents[timelineEvents.length - 1]
    const endTime = lastEvent?.time ?? '00:00'
    const endTimeMinutes = parseTimeToMinutes(endTime)
    const endDatePart =
        endTimeMinutes <= startTimeMinutes ? addDaysGmtMinus5(datePart, 1) : datePart
    const endDate = new Date(`${endDatePart}T${endTime}:00-05:00`)

    return generateGoogleCalendarUrl(
        'Boda de Khatlee & Jhonnatan',
        startDate,
        endDate,
        'Acompananos en nuestro gran dia! Ubicacion: https://maps.app.goo.gl/5fWxP7niQrBhtanm7',
        'https://maps.app.goo.gl/5fWxP7niQrBhtanm7'
    )
}
