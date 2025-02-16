import axios from 'axios';

export const updateEvent = async (updatedEvent) => {
    try {
        const response = await axios.put(`/api/calendar/${updatedEvent.id}`, updatedEvent); // PUT 요청
        return response.data;
    } catch (error) {
        console.error('이벤트 수정 실패:', error);
        throw error;
    }
};