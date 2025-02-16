import axios from 'axios';

//공통 변환 로직
const formatEventData = (eventData) => {
    return eventData.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        start: item.startDate,
        end: item.endDate
    }));
};


export const getAllEvent = async () => {
    try {
        const response = await axios.get('/api/calendar');  // 상대 경로 사용
        return formatEventData(response.data);
    } catch (error) {
        console.error('이벤트를 가져오는 중 에러가 발생했습니다. :', error);
        throw error;
    }
};

export const getEvent = async (eventId) =>{
    try {
        const response = await axios.get(`/api/calendar/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('이벤트를 가져오는 중 에러가 발생했습니다. :', error);
        throw error;
    }
}
