import React, { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";

export default function DropdownWithPills() {
  // State to manage the visibility of options and selected value
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // Handle the dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
      <div className="relative">
        {/* Dropdown icon (could be any icon) */}
        <button
          onClick={toggleDropdown}
          className="rounded-ful focus:outline-none cursor-pointer"
        >
          <RxDropdownMenu className="hover:text-cyan-600" size={12}/>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 text-xs border-1 border-gray-200">
            <ul className="space-y-2 py-2 px-4">
              <li
                onClick={() => handleSelectOption("pending")}
                className="cursor-pointer px-4 py-1 rounded-full bg-blue-200 text-blue-700 hover:bg-blue-300 w-fit"
              >
                Pending
              </li>
              <li
                onClick={() => handleSelectOption("completed")}
                className="cursor-pointer px-4 py-1 rounded-full text-green-700 bg-green-200 hover:bg-green-300 w-fit"
              >
                Completed
              </li>
              <li
                onClick={() => handleSelectOption("Progress")}
                className="cursor-pointer px-4 py-1 rounded-full text-amber-700 bg-amber-200 hover:bg-amber-300 w-fit"
              >
                Progress
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
