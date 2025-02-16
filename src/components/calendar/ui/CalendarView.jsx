import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import useEventsList from "../hooks/useEventsList";
import EventAddModal from "./EventAddModal";
import interactionPlugin from '@fullcalendar/interaction';
import EventDetailModal from "./EventDetailModal";
import useEventHandler from "../hooks/useEventHandler";
import useQrEventHandler from "../../share/hooks/useQrEventHandler";
import QrExportModal from "../../share/ui/QrExportModal";
import QrImportModal from "../../share/ui/QrImportModal";

const Calendar = () => {
    const calendarHook = useEventHandler(useEventsList);
    const shareQrHook = useQrEventHandler()

    return (
        <div id="Calendar">
            <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, interactionPlugin]}
                customButtons={{
                    shareButton1: {
                        text: '일정 내보내기',
                        click: shareQrHook.openExportModal
                    },
                    shareButton2: {
                        text: '일정 가져오기',
                        click: shareQrHook.openImportModal
                    }
                }}
                headerToolbar={{
                    left: 'title',
                    right: 'shareButton1, shareButton2, today, prev, next'
                }}
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
            <QrExportModal
                isOpen={shareQrHook.isQrModalOpen}
                onClose={shareQrHook.closeExportModal}
            />
            <QrImportModal
                isOpen={shareQrHook.isImportModalOpen}
                onClose={shareQrHook.closeImportModal}  // 모달 닫기
            />
        </div>
    );

}
export default Calendar;