import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

import Modal from "./Modal";
import Todo from "./Todo";
import StatusContainer from "../CustomComponents/StatusContainer";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../redux/todo/todosSlice";

const FilterDropdown = ({ searchParams, setSearchParams }) => {
  const [completionStatus, setCompletionStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectOption = (option) => {
    const prevParams = Object.fromEntries([...searchParams]);
    if (option === "all") {
      delete prevParams.status;
      setSearchParams({ ...prevParams });
    } else {
      setSearchParams({ ...prevParams, status: option });
    }
    setCompletionStatus(option);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-3 w-[100px] ml-auto justify-end align-bottom mt-2">
      <div>
        <StatusContainer status={completionStatus} />
      </div>
      <div className="relative inline-block">
        <button
          type="submit"
          className="px-1 py-1 text-sm font-medium text-center inline-flex items-center text-gray-500 bg-white rounded-lg hover:bg-white hover:text-cyan-500 focus:outline-none"
          onClick={toggleDropdown}
        >
          <CiFilter size={16} className="mr-1" /> Status
        </button>
       

        {isOpen && (
          <div className="absolute right-0 top-2 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 text-xs border border-gray-200 overflow-auto">
            <ul className="space-y-2 py-2 px-4">
              {["all", "pending", "completed", "progress"].map((option) => (
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
                            : option === "progress"
                            ? "bg-amber-200 text-amber-700 hover:bg-amber-300"
                            : "bg-purple-200 text-purple-700 hover:bg-purple-300"
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

const Todos = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isOpen, setIsOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const todos = useSelector((store) => store.todo.todos?.data);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  useEffect(() => {
    const prevParams = Object.fromEntries([...searchParams]);
    dispatch(getTodos({ params: { ...prevParams } }));
  }, [dispatch, searchParams]);

  return (
    <div className="flex flex-col">
      <h3 className="text-center xs:text-4xl md:text-4xl lg:text-4xl font-medium py-5 px-2 text-gray-900 text-shadow-gray-600 text-shadow-sm tracking-wider">
        Todo List
      </h3>
      <div className="p-2 m-auto max-w-[600px] w-full min-h-screen ">
        <div className="relative w-full flex justify-between">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search Todo.."
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-cyan-400 focus:border-cyan-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
            />
          </div>
          <div className="flex justify-center items-center ml-2">
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-cyan-400 rounded-lg hover:bg-white hover:text-cyan-500 hover:ring-1 has-last:hover:ring-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:bg-cyan-400 dark:hover:bg-cyan-400 dark:focus:ring-cyan-500"
              onClick={() => setIsOpen(true)}
            >
              <MdAddCircleOutline size={"16"} className="mr-1" /> Add
            </button>
          </div>
        </div>

        <div className="mt-10">
          <FilterDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          {todoList?.map((todo, i) => {
            return <Todo key={`todo-item-${i}`} info={todo} />;
          })}
        </div>
      </div>

      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} isNew={true} />}
    </div>
  );
};

export default Todos;
