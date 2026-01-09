import { useState, useRef, useEffect } from 'react'

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

// Generate years from 1990 to 2008 (for college students)
const years = Array.from({ length: 19 }, (_, i) => 2008 - i)

const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

export default function DatePicker({ value, onChange, name }) {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState('day') // 'day', 'month', 'year'
    const containerRef = useRef(null)

    // Parse the value (YYYY-MM-DD format)
    const parseDate = (dateStr) => {
        if (!dateStr) return { day: null, month: new Date().getMonth(), year: 2003 }
        const [y, m, d] = dateStr.split('-').map(Number)
        return { day: d, month: m - 1, year: y }
    }

    const [selectedDate, setSelectedDate] = useState(() => parseDate(value))
    const [viewMonth, setViewMonth] = useState(selectedDate.month)
    const [viewYear, setViewYear] = useState(selectedDate.year)

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false)
                setView('day')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const formatDisplayDate = () => {
        if (!selectedDate.day) return 'Select your birthday'
        return `${months[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
    }

    const handleDayClick = (day) => {
        const newDate = { ...selectedDate, day, month: viewMonth, year: viewYear }
        setSelectedDate(newDate)

        // Format as YYYY-MM-DD for form submission
        const dateStr = `${newDate.year}-${String(newDate.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        onChange({ target: { name, value: dateStr } })
        setIsOpen(false)
    }

    const handleMonthClick = (monthIndex) => {
        setViewMonth(monthIndex)
        setView('day')
    }

    const handleYearClick = (year) => {
        setViewYear(year)
        setView('month')
    }

    const navigateMonth = (direction) => {
        let newMonth = viewMonth + direction
        let newYear = viewYear

        if (newMonth < 0) {
            newMonth = 11
            newYear -= 1
        } else if (newMonth > 11) {
            newMonth = 0
            newYear += 1
        }

        setViewMonth(newMonth)
        setViewYear(newYear)
    }

    const daysInMonth = getDaysInMonth(viewMonth, viewYear)
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()

    const renderDayView = () => (
        <>
            <div className="datepicker-header">
                <button type="button" className="datepicker-nav" onClick={() => navigateMonth(-1)}>
                    ‹
                </button>
                <div className="datepicker-title">
                    <button type="button" onClick={() => setView('month')} className="datepicker-title-btn">
                        {months[viewMonth]}
                    </button>
                    <button type="button" onClick={() => setView('year')} className="datepicker-title-btn">
                        {viewYear}
                    </button>
                </div>
                <button type="button" className="datepicker-nav" onClick={() => navigateMonth(1)}>
                    ›
                </button>
            </div>

            <div className="datepicker-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="datepicker-days">
                {/* Empty cells for days before the 1st */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                    <span key={`empty-${i}`} className="datepicker-day empty"></span>
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const isSelected = day === selectedDate.day &&
                        viewMonth === selectedDate.month &&
                        viewYear === selectedDate.year
                    return (
                        <button
                            key={day}
                            type="button"
                            className={`datepicker-day ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </button>
                    )
                })}
            </div>
        </>
    )

    const renderMonthView = () => (
        <>
            <div className="datepicker-header">
                <button type="button" className="datepicker-nav" onClick={() => setViewYear(y => y - 1)}>
                    ‹
                </button>
                <button type="button" onClick={() => setView('year')} className="datepicker-title-btn solo">
                    {viewYear}
                </button>
                <button type="button" className="datepicker-nav" onClick={() => setViewYear(y => y + 1)}>
                    ›
                </button>
            </div>

            <div className="datepicker-months">
                {months.map((month, i) => (
                    <button
                        key={month}
                        type="button"
                        className={`datepicker-month ${i === viewMonth ? 'selected' : ''}`}
                        onClick={() => handleMonthClick(i)}
                    >
                        {month.slice(0, 3)}
                    </button>
                ))}
            </div>
        </>
    )

    const renderYearView = () => (
        <>
            <div className="datepicker-header">
                <span className="datepicker-title-btn solo">Select Year</span>
            </div>

            <div className="datepicker-years">
                {years.map(year => (
                    <button
                        key={year}
                        type="button"
                        className={`datepicker-year ${year === viewYear ? 'selected' : ''}`}
                        onClick={() => handleYearClick(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </>
    )

    return (
        <div className="datepicker-container" ref={containerRef}>
            <button
                type="button"
                className={`datepicker-trigger ${selectedDate.day ? 'has-value' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{formatDisplayDate()}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            </button>

            {isOpen && (
                <div className="datepicker-dropdown">
                    {view === 'day' && renderDayView()}
                    {view === 'month' && renderMonthView()}
                    {view === 'year' && renderYearView()}
                </div>
            )}
        </div>
    )
}
