const DIVISIONS = [
    {amount: 60, name: "seconds"},
    {amount: 60, name: "minutes"},
    {amount: 24, name: "hours"},
    {amount: 7, name: "days"},
    {amount: 4.34524, name: "weeks"},
    {amount: 12, name: "months"},
    {amount: Number.POSITIVE_INFINITY, name: "years"},
]

type RelativeTimeFormatUnit =
    | "year"
    | "years"
    | "quarter"
    | "quarters"
    | "month"
    | "months"
    | "week"
    | "weeks"
    | "day"
    | "days"
    | "hour"
    | "hours"
    | "minute"
    | "minutes"
    | "second"
    | "seconds";

const dateFormatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
})

const numberFormatter = Intl.NumberFormat(undefined, { notation: 'compact' });

export function formatTimeAgo(date: Date) {
    let duration = (date.getTime() - new Date().getTime()) / 1000

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i]
        if (Math.abs(duration) < division.amount) {
            const unit = division.name as RelativeTimeFormatUnit
            return dateFormatter.format(Math.round(duration), unit)
        }
        duration /= division.amount
    }
}

export function formatNumberThousand(value: number) {
    return numberFormatter.format(value)
}