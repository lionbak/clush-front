import React, { useState, useEffect } from 'react';
import {updateEvent} from "../api/CalendarPutEvent";
import {deleteEvent} from "../api/CalendarDelEvent";
import "./EventModal.css"

const EventDetailModal = ({ isOpen, onClose, eventData, onUpdate, onDelete }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 모달이 열릴 때 이벤트 데이터를 받아서 상태를 설정
    useEffect(() => {
        if (eventData) {
            setTitle(eventData.title);
            setDescription(eventData.description);
            setStartDate(eventData.startDate);
            setEndDate(eventData.endDate);
        }
    }, [eventData]);

    const handleSave = async () => {
        try {
            const updatedEvent = {
                ...eventData,
                title,
                description,
                startDate,
                endDate,
            };
            await updateEvent(updatedEvent);
            onUpdate(updatedEvent);
            onClose();
            alert('일정이 수정되었습니다.');
        } catch (error) {
            console.error('일정 수정 중 오류 발생:', error);
            alert('일정 수정에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEvent(eventData.id);
            onDelete(eventData.id);
            onClose();
            alert('일정이 삭제되었습니다.');
        } catch (error) {
            console.error('일정 삭제 중 오류 발생:', error);
            alert('일정 삭제에 실패했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>일정 상세 정보</h3>
                <input
                    type="text"
                    placeholder="일정 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="일정 설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleSave}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;