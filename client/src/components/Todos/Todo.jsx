import React from "react";
import CustomSelect from "./CustomSelect";
import StatusContainer from "../CustomComponents/StatusContainer";
import { IoMdMore } from "react-icons/io";

const Todo = ({
  title = "Finish Homework",
  date = "23 June 2025",
  status = "pending",
}) => {
  return (
    <div className="flex items-start space-x-3 w-full mt-2 bg-white rounded-xl shadow-lg border-1 border-cyan-100 p-4">
      <input type="checkbox" className="mt-1 w-5 h-5 rounded-full " />

      <div className="w-full">
        <div className="flex justify-between">
          <h4 className="xs:text-md sm:text-xl font-bold tracking-wide">
            {title}
          </h4>
          <button className="text-gray-500 p-1 hover:text-cyan-600 hover:bg-cyan-50 rounded-full cursor-pointer">
            <IoMdMore className="" size={16} />
          </button>
        </div>
        <div className="flex gap-5 mt-1">
          <p className="text-gray-500 text-sm">{date}</p>
          <div className="flex gap-2 align-top">
            <StatusContainer status={status} />
            <CustomSelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
