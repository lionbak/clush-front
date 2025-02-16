import {useState} from 'react';
import {formatInTimeZone} from 'date-fns-tz';
import {getEvent} from '../api/CalendarGetEvent';

const useEventHandler = (useEventsList) => {
    const { getAllEvents, fetchEvents, addEvent } = useEventsList();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const dayChangeHandle = (arg) => {
        return arg.dayNumberText.replace("일", "");
    };

    const handleDateSelect = (selectInfo) => {
        const selectedDate = new Date(selectInfo.date);
        const formattedDate = formatInTimeZone(selectedDate, 'Asia/Seoul', 'yyyy-MM-dd') + "T00:00";
        setSelectedDate(formattedDate);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddEvent = async (newEvent) => {
        addEvent(newEvent);
        await fetchEvents();
        setIsModalOpen(false);
    };

    const handleEventClick = async (clickInfo) => {
        try {
            const eventId = clickInfo.event.id;
            const eventData = await getEvent(eventId);
            setSelectedEvent(eventData);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error("단일 이벤트 가져오기 실패:", error);
        }
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const updateEventInCalendar = async () => {
        await fetchEvents();
    };

    const deleteEventInCalendar = async () => {
        await fetchEvents();
    };

    return {
        // states
        isModalOpen,
        selectedDate,
        isDetailModalOpen,
        selectedEvent,
        getAllEvents,

        // handlers
        dayChangeHandle,
        handleDateSelect,
        closeModal,
        handleAddEvent,
        handleEventClick,
        closeDetailModal,
        updateEventInCalendar,
        deleteEventInCalendar
    };
};

export default useEventHandler;