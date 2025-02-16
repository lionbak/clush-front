import axios from 'axios';

export const getAllEvent = async () => {
    try {
        const response = await axios.get('/api/calendar');  // 상대 경로 사용
        return response.data;
    } catch (error) {
        console.error('이벤트를 가져오는 중 에러가 발생했습니다. :', error);
        throw error;
    }
};

