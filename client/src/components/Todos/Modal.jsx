import { useRef } from "react";
import CustomDatePicker from "../DatePicker/CustomDatePicker";

export default function Modal({ isOpen, setIsOpen }) {
  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>

            <CustomDatePicker />
          </div>
        </div>
      )}
    </div>
  );
}
