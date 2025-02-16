import {useEffect, useState} from "react";
import {getAllEvent} from "../api/CalendarGetEvent";

const useEventsList = () => {
    const [getAllEvents, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const formattedEvents = await getAllEvent();
            setEvents(formattedEvents);
        } catch (error) {
            console.error("데이터를 가져오는데 실패했습니다. :", error);
        }
    };
    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 상태 즉시 반영
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { getAllEvents, fetchEvents, addEvent };
};

export default useEventsList;