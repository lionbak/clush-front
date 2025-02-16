import axios from 'axios';

export const shareQrEvent = async () => {
    try {
        const response = await axios.get('/api/share/qr', { responseType: 'blob' });

        // Blob 데이터를 URL로 변환
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('QR 코드 생성 실패:', error);
    }
};

