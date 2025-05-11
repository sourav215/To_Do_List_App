import React, { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { Controller } from "react-hook-form";
import StatusContainer from "../CustomComponents/StatusContainer";

export default function CustomSelect({ control }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex gap-2 w-[100px] ml-auto justify-end mt-2">
      <div>
        {control && (
          <Controller
            control={control}
            name="status"
            render={({ field: { value } }) =>
              value && <StatusContainer status={value} />
            }
          />
        )}
      </div>
      <div className="relative inline-block">
        {/* Button to toggle dropdown */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-ful focus:outline-none cursor-pointer"
        >
          <RxDropdownMenu className="hover:text-cyan-600" size={12} />
        </button>

        {/* Dropdown options controlled via react-hook-form */}
        {isOpen && (
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange } }) => (
            
                <div className="absolute right-0 top-2 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 text-xs border border-gray-200 overflow-auto">
                  <ul className="space-y-2 py-2 px-4">
                    {["pending", "completed", "progress"].map((option) => (
                      <li
                        key={option}
                        onClick={() => {
                          onChange(option);
                          setIsOpen(false);
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
          />
        )}
      </div>


      
    </div>
  );
}
