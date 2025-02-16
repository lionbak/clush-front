import React, {useState, useEffect} from "react";
import { postEvent } from "../api/CalendarPostEvent";
import "./EventModal.css";


const EventAddModal = ({isOpen, onClose, selectedDate, onAddEvent}) => {
    const [title, setEventTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (selectedDate) {
            setStartDate(selectedDate); // 부모 컴포넌트에서 받은 날짜를 바로 설정
            setEndDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (isOpen) {
            setEventTitle("");
            setDescription("");
        }
    }, [isOpen]);

    const handleAddEvent = async () => {
            const newEvent = {
                title,
                description,
                startDate,
                endDate
            };
            try {
                const createdEvent = await postEvent(newEvent);
                onAddEvent(createdEvent);
                alert("일정이 추가되었습니다.");
                onClose();
            } catch (error) {
                console.log("일정 추가 중 오류 발생:", error);
                alert("일정 추가에 실패했습니다.")
            }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>새로운 일정 추가</h3>
                <input
                    type="text"
                    placeholder="일정 제목"
                    value={title || ""}
                    onChange={(e) => setEventTitle(e.target.value)}
                />
                <textarea
                    placeholder="일정 설명"
                    value={description || ""}
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
                    <button onClick={handleAddEvent}>추가</button>
                </div>
            </div>
        </div>
    );
};

export default EventAddModal;