import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import useEventsList from "../hooks/useEventsList";
import EventAddModal from "./EventAddModal";
import interactionPlugin from '@fullcalendar/interaction';
import useEventHandler from "../hooks/useEventHandler";

const Calendar = () => {
    const calendarHook = useEventHandler(useEventsList);

        return (
            <div id="Calendar">
                <FullCalendar
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="ko"
                    events={calendarHook.getAllEvents}
                    dayCellContent={calendarHook.dayChangeHandle}
                    selectable={true}
                    dateClick={calendarHook.handleDateSelect}
                    dayMaxEvents={true}
                />
                <EventAddModal
                    isOpen={calendarHook.isModalOpen}
                    onClose={calendarHook.closeModal}
                    onAddEvent={calendarHook.handleAddEvent}
                    selectedDate={calendarHook.selectedDate}
                />
            </div>
        );

}
export default Calendar;