import { useRef } from "react";
import TodoCreator from "../TodoCreator/TodoCreator";
import UpdateTodo from "../TodoCreator/UpdateTodo";

export default function Modal({ isOpen, setIsOpen, isNew, info={} }) {
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
            className="bg-white rounded-3xl shadow-lg p-5 w-full max-w-md xs:w-full lg:min-w-[600px] lg:max-w-[600px] m-4"
          >
            {isNew ? (
              <TodoCreator setIsOpen={setIsOpen} />
            ) : (
              <UpdateTodo setIsOpen={setIsOpen} info={info} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
