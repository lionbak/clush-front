import axios from 'axios';

export const postEvent = async (eventData) => {
    try {
        const response = await axios.post('/api/calendar', eventData);
        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('이벤트를 보내는 중 오류가 발생했습니다. :', error);
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data); // 서버 응답 데이터 확인
        }
        throw error;
    }
};