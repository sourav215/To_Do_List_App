import { useEffect } from "react";
import "./TodoCreator.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import CustomSelect from "../Todos/CustomSelect";
import {
  clearTodoUpdation,
  getTodos,
  updateTodo,
} from "../../redux/todo/todosSlice";
import { LoadingIcon } from "../../assets/svg";

// Set date limits
const today = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 30);

// Yup validation schema
const schema = yup.object().shape({
  end_date: yup
    .date()
    .required("Date is required")
    .min(today, "Date must be today or later")
    .max(maxDate, "Date must be within the next 30 days"),
  title: yup.string().required("Title is Required"),
  description: yup.string(),
  status: yup.string().required("Status is required"),
});

export default function UpdateTodo({ info, setIsOpen }) {
  const dispatch = useDispatch();
  const todo_updation_success = useSelector(
    (store) => store.todo.updateTodo?.success
  );
  const updateButtonLoading = useSelector(
    (store) => store.todo.updateTodo?.loading
  );

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      end_date: new Date(),
      title: "",
      description: "",
      status: "pending",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const { end_date, title, description, status } = data;
    const payload = {
      title,
      description,
      status,
      end_date: end_date.toISOString(),
    };
    dispatch(updateTodo({ id: info._id, data: payload }));
  };

  useEffect(() => {
    if (todo_updation_success) {
      dispatch(clearTodoUpdation());
      dispatch(getTodos({ params: {} }));
      setIsOpen(false);
    }
  }, [setIsOpen, dispatch, todo_updation_success]);

  useEffect(() => {
    reset({
      end_date: new Date(info.end_date),
      title: info.title,
      description: info.description,
      status: info.status,
    });
  }, [reset, info]);

  return (
    <div className="w-full">
      <h2 className="text-xl text-center font-semibold mb-2">Edit Todo</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-full space-y-4"
      >
        <div>
          <label htmlFor="todo-title">Title</label>
          <div className="mt-2">
            <input
              type="text"
              id="todo-title"
              name="title"
              required
              autoComplete="title"
              placeholder="Enter Title"
              {...register("title")}
              className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="todo-description">Description</label>
          <div className="mt-2">
            <textarea
              type="text"
              id="todo-description"
              name="description"
              required
              autoComplete="description"
              placeholder="Enter description"
              {...register("description")}
              rows={3}
              className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 pl-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <label className="block mb-2">Select a Date</label>
            <Controller
              control={control}
              name="end_date"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={today}
                  maxDate={maxDate}
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Select a date"
                  className="w-full px-2 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder:text-sm"
                />
              )}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm">{errors.end_date.message}</p>
            )}
          </div>
          <div className="lg: mr-4">
            <label className="pl-2"> Status</label>
            <CustomSelect control={control} />

            {errors?.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status?.message}
              </p>
            )}
            <h2></h2>
          </div>
        </div>

        <button
          type="submit"
          disabled={updateButtonLoading}
          className={`w-full mt-4 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 ${
            updateButtonLoading ? "cursor-not-allowed" : "cursor-pointer"
          } ${
            updateButtonLoading ? "opacity-50" : "opacity-100"
          } flex justify-center items-center`}
        >
          {updateButtonLoading && <LoadingIcon />}
          {updateButtonLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
