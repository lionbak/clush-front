import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import useEventsList from "../hooks/useEventsList";
import interactionPlugin from '@fullcalendar/interaction';


const Calendar = () => {
    const calendarEvent = useEventsList;

        return (
            <div id="Calendar">
                <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="ko"
                    events={calendarEvent.getAllEvents}
                    dayMaxEvents={true}
                />
            </div>
        );

}
export default Calendar;