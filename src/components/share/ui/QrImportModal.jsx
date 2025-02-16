import React, {useState} from 'react';
import jsQR from 'jsqr';
import {QrPostEvents} from "../api/QrPostEvent";
import "./QrModal.css"

const QrImportModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageData, setImageData] = useState(null);

    // 파일 선택 시 처리
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageData(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // QR 코드 디코딩 함수
    const decodeQRCode = () => {
        if (!imageData) {
            setError("이미지를 먼저 선택하세요.");
            return;
        }

        const img = new Image();
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const imageDataQR = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageDataQR.data, canvas.width, canvas.height);

            if (code) {
                console.log("QR 코드 데이터:", code.data);
                try {
                    const eventData = JSON.parse(code.data);
                    console.log("파싱된 이벤트 데이터:", eventData);

                    setLoading(true);
                    setError(null);
                    await QrPostEvents(eventData);
                    setLoading(false);
                    onClose();  // 성공 후 모달 닫기
                    alert('이벤트 동기화 성공!');

                } catch (jsonError) {
                    console.error("JSON 파싱 오류:", jsonError);
                    // 한글이 깨진 상태로 JSON이 파싱되었을 수 있으므로 데이터 확인
                    console.log("Failed JSON string:", code.data);
                    throw jsonError;
                }
            } else {
                console.error("QR 코드가 아닙니다.");
            }
        };
        img.src = imageData;
    };

    if (!isOpen) return null;

    return (
        <div className="qr-modal-overlay">
            <div className="qr-modal-content">
                <h2>QR 코드 가져오기</h2>
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                <div className="qr-modal-buttons">
                    <button onClick={onClose}>닫기</button>
                    <button onClick={decodeQRCode} disabled={loading}>가져오기</button>
                </div>
                {loading && <p>동기화 중...</p>}
                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </div>
    );
};

export default QrImportModal;