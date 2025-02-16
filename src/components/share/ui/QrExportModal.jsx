import React, { useState, useEffect } from 'react';
import {shareQrEvent} from "../api/ShareQrEvent";
import "./QrModal.css"

const QrModal = ({ isOpen, onClose }) => {
    const [qrCodeData, setQrCodeData] = useState(null);

    useEffect(() => {
        // 모달이 열리면 QR 코드 데이터를 가져옵니다.
        const fetchQrCode = async () => {
            if (isOpen) {
                const qrCode = await shareQrEvent(); // QR 코드 생성 요청
                setQrCodeData(qrCode); // 받아온 QR 코드 데이터를 상태에 저장
            }
        };

        fetchQrCode();
    }, [isOpen]);

    const handleClose = () => {
        onClose();
        setQrCodeData(null); // QR 코드 초기화
    };

    if (!isOpen) return null;

    return (
        <div className="qr-modal-overlay">
            <div className="qr-modal-content">

                <h2 className="qr-modal-title">일정 공유 QR 코드</h2>
                {qrCodeData ? (
                    <>
                    <img src={qrCodeData} alt="QR Code"/>
                    <a href={qrCodeData} download="qr-code.png" className="qr-download-button">QR 코드 다운로드</a>
                    </>
                ) : (
                    <p>QR 코드를 생성하는 중...</p>
                )}

                <div className="qr-modal-buttons">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>

    );
};

export default QrModal;

