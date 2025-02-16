import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import useEventsList from "../hooks/useEventsList";
import EventAddModal from "./EventAddModal";
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailModal from "./EventDetailModal";
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
                eventClick={calendarHook.handleEventClick}
                dayCellContent={calendarHook.dayChangeHandle}
                selectable={true}
                dateClick={calendarHook.handleDateSelect}
                dayMaxEvents={true}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute:'2-digit',
                    meridiem: false,
                    hour12: false,
                    allDay: false
                }}
                eventColor="#76c3c5" // 이벤트 기본 색상 설정
                eventTextColor="#089196" // 이벤트 텍스트 색상 설정
                eventBackgroundColor="#76c3c577" // 이벤트 배경 색상 설정
                eventBorderColor="#76c3c5" // 이벤트 테두리 색상 설정
            />
            <EventAddModal
                isOpen={calendarHook.isModalOpen}
                onClose={calendarHook.closeModal}
                onAddEvent={calendarHook.handleAddEvent}
                selectedDate={calendarHook.selectedDate}
            />
            <EventDetailModal
                isOpen={calendarHook.isDetailModalOpen}
                onClose={calendarHook.closeDetailModal}
                eventData={calendarHook.selectedEvent}
                onUpdate={calendarHook.updateEventInCalendar}
                onDelete={calendarHook.deleteEventInCalendar}
            />
        </div>
    );

}
export default Calendar;