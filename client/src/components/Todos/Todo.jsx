import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "./CustomSelect";
import StatusContainer from "../CustomComponents/StatusContainer";
import { IoMdMore } from "react-icons/io";
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTodoDeletion,
  clearTodoUpdation,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../redux/todo/todosSlice";
import { CustomToast } from "../CustomComponents/CustomToast";

const StatusDropdown = ({ id, status }) => {
  const [completionStatus, setCompletionStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectOption = (option) => {
    dispatch(updateTodo({ id: id, data: { status: option } }));
    setCompletionStatus(option);
    setIsOpen(false);
  };
  return (
    <div className="flex gap-2 w-[100px] ml-auto justify-end mt-2">
      <div>
        <StatusContainer status={completionStatus} />
      </div>
      <div className="relative inline-block">
        <button
          type="button"
          onClick={toggleDropdown}
          className="rounded-ful focus:outline-none cursor-pointer"
        >
          <RxDropdownMenu className="hover:text-cyan-600" size={12} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-2 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 text-xs border border-gray-200 overflow-auto">
            <ul className="space-y-2 py-2 px-4">
              {["pending", "completed", "progress"].map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    handleSelectOption(option);
                  }}
                  className={`cursor-pointer px-4 py-1 rounded-full w-fit
                        ${
                          option === "pending"
                            ? "bg-blue-200 text-blue-700 hover:bg-blue-300"
                            : option === "completed"
                            ? "bg-green-200 text-green-700 hover:bg-green-300"
                            : "bg-amber-200 text-amber-700 hover:bg-amber-300"
                        }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const OpenMenu = ({ setIsEditModalOpen, id }) => {
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const is_deletion_success = useSelector(
    (store) => store.todo.deleteTodo?.success
  );
  const deletion_id = useSelector((store) => store.todo.deleteTodo?.data?._id);

  const toggleDropdown = () => {
    setIsMenuBarOpen(!isMenuBarOpen);
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
  };

  useEffect(() => {
    if (is_deletion_success && id === deletion_id) {
      dispatch(clearTodoDeletion());
      CustomToast({ type: "success", message: "Deleted" });
      dispatch(getTodos({ params: {} }));
      setIsMenuBarOpen(false);
    }
  }, [dispatch, id, deletion_id, is_deletion_success]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="text-gray-500 p-1 hover:text-cyan-600 hover:bg-cyan-50 rounded-full cursor-pointer"
      >
        <IoMdMore className="" size={16} />
      </button>

      {isMenuBarOpen && (
        <div
          ref={menuRef}
          className="absolute right-3 top-2 mt-1 bg-white rounded-lg shadow-lg z-20 text-sm border border-gray-200 overflow-auto"
        >
          <ul className="space-y-2 py-2 px-2">
            <li
              onClick={() => {
                setIsMenuBarOpen(false);
                setIsEditModalOpen(true);
              }}
              className="flex justify-center items-center gap-1 cursor-pointer px-2 py-1 rounded  text-gray-600 bg-gray-100 hover:bg-cyan-100 hover:text-cyan-700"
            >
              <MdOutlineEdit /> <span>Edit</span>
            </li>
            <li
              onClick={handleDeleteTodo}
              className="flex justify-center items-center gap-1 cursor-pointer px-2 py-1 rounded  text-gray-600 bg-gray-100 hover:bg-cyan-100 hover:text-cyan-700"
            >
              <RiDeleteBin6Line />
              <span>Delete</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const TodoCompletion = ({ id, isCompleted, setIsCompleted }) => {
  const dispatch = useDispatch();

  const updatedTodoId = useSelector(
    (store) => store.todo.updateTodo?.data?._id
  );

  const is_updation_success = useSelector(
    (store) => store.todo.updateTodo?.success
  );

  const handleComplete = (e) => {
    dispatch(updateTodo({ id: id, data: { completed: e.target.checked } }));

    setIsCompleted(e.target.checked);
  };

  useEffect(() => {
    if (is_updation_success && id === updatedTodoId) {
      CustomToast({ type: "success", message: "Updated" });
      dispatch(clearTodoUpdation());
    }
  }, [id, updatedTodoId, dispatch, is_updation_success]);
  return (
    <input
      type="checkbox"
      className="mt-1 w-5 h-5 rounded-full"
      checked={isCompleted}
      onChange={handleComplete}
    />
  );
};

const Todo = ({ info }) => {
  const {
    _id,
    title,
    completed,
    status,
    end_date = new Date().getDate(),
  } = info;

  const [isCompleted, setIsCompleted] = useState(completed || false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="flex items-start space-x-3 w-full mt-2 bg-white rounded-xl shadow-lg border-1 border-cyan-100 p-4">
      <TodoCompletion
        id={_id}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
      <div className="w-full">
        <div className="flex justify-between">
          <h4
            className={`xs:text-md sm:text-xl font-bold tracking-wide transition-all duration-400 ${
              isCompleted
                ? "line-through text-gray-400 opacity-50"
                : "text-gray-900"
            }`}
          >
            {title}
          </h4>

          {!isEditModalOpen && (
            <OpenMenu setIsEditModalOpen={setIsEditModalOpen} id={_id} />
          )}
        </div>
        <div
          className={`flex gap-5 mt-1 ${
            isCompleted ? "text-gray-400 opacity-50" : "text-gray-900"
          }`}
        >
          <p className="text-gray-500 text-sm">
            {" "}
            {new Intl.DateTimeFormat("en-GB").format(new Date(end_date))}
          </p>
          <div className="flex gap-2 align-top">
            {!isCompleted && <StatusDropdown id={_id} status={status} />}
          </div>
        </div>

        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            isNew={false}
            info={info}
          />
        )}
      </div>
    </div>
  );
};

export default Todo;
