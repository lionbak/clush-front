import axios from 'axios';

export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`/api/calendar/${eventId}`); // DELETE 요청
        return response.data;
    } catch (error) {
        console.error('이벤트 삭제 실패:', error);
        throw error;
    }
};