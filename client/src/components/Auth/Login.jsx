import React, { useEffect } from "react";
import { FaUserLock } from "react-icons/fa";
import { LoadingIcon } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authSlice";
import { CustomToast } from "../CustomComponents/CustomToast";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.user?.token);
  const isButtonLoading = useSelector((state) => state.auth.user?.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    dispatch(loginUser({ credential: data }));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiryTime", Date.now() + 24 * 60 * 60 * 1000);
      CustomToast({ type: "success", message: "Login successful" });
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex max-w-[400px] flex-1 flex-col mt-10 mx-5 px-6 py-12 lg:px-8 shadow rounded-xl bg-white h-fit">
        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center">
            <FaUserLock size={"30"} />
          </div>
          <div>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <div className="mt-2">
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter Email"
                  {...register("email")}
                  className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 pl-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  required
                  autoComplete="password"
                  placeholder="Enter Password"
                  {...register("password")}
                  className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 pl-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isButtonLoading}
                className={`flex w-full justify-center rounded-md bg-cyan-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 min-h-10 ${
                  !isButtonLoading ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {isButtonLoading && <LoadingIcon />}
                {isButtonLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <div>
              <p className="text-center text-sm text-gray-400">
                Don't have an Account?{" "}
                <span
                  className="cursor-pointer text-cyan-500"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
