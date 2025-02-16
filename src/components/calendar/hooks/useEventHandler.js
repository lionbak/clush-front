import { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';

const useEventHandler = (useEventsList) => {
    const { getAllEvents, fetchEvents, addEvent } = useEventsList();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const dayChangeHandle = (arg) => {
        const dayNumber = arg.dayNumberText.replace("일", "");
        return dayNumber;
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

    return {
        // states
        isModalOpen,
        selectedDate,
        getAllEvents,

        // handlers
        dayChangeHandle,
        handleDateSelect,
        closeModal,
        handleAddEvent,
    };
};

export default useEventHandler;