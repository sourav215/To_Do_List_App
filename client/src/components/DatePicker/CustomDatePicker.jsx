import React from "react";
import "./CustomDatePicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Set date limits
const today = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 30);

// Yup validation schema
const schema = Yup.object().shape({
  date: Yup.date()
    .required("Date is required")
    .min(today, "Date must be today or later")
    .max(maxDate, "Date must be within the next 30 days"),
});

export default function CustomDatePicker() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(`Selected date: ${data.date}`);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <label className="block font-semibold">Select a Date</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              minDate={today}
              maxDate={maxDate}
              placeholderText="Select a date"
              className="w-full px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
