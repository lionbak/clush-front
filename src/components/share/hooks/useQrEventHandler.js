import {useState} from "react";

const useQrEvent = () => {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const openExportModal = () => {
        setIsQrModalOpen(true);
    };
    const closeExportModal = () => {
        setIsQrModalOpen(false);
    };

    const openImportModal = () => {
        setIsImportModalOpen(true);  // QrImportModal 열기
    };

    const closeImportModal = () => {
        setIsImportModalOpen(false)
    }

    return {
        // states
        isQrModalOpen,
        isImportModalOpen,

        // handlers
        openExportModal,
        closeExportModal,
        openImportModal,
        closeImportModal

    };
}

export default useQrEvent;