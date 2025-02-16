import axios from "axios";

export const QrPostEvents = async (eventsData) => {
    try {
        const responses = await Promise.all(
            eventsData.map(async (event) => {
                const response = await axios.post('/api/calendar', event);
                return response.data;
            })
        );
        console.log('여러 이벤트 전송 성공:', responses);
        return responses;  // 모든 응답 결과 반환
    } catch (error) {
        console.error('여러 이벤트 전송 중 오류 발생:', error);
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data); // 서버 응답 데이터 확인
        }
        throw error;
    }
};