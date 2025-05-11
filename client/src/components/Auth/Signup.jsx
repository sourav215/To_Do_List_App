import { useEffect } from "react";
import { FaUserLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../../assets/svg";
import { CustomToast } from "../CustomComponents/CustomToast";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
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

const Signup = () => {
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
    dispatch(signupUser({ credential: data }));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiryTime", Date.now() + 24 * 60 * 60 * 1000);
      CustomToast({ type: "success", message: "Sign up successful" });
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex max-w-[400px] flex-1 flex-col mt-10 mx-5 px-6 py-12 lg:px-8 shadow rounded-xl bg-white h-fit">
        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center">
            <FaUserLock size={"30"} />
          </div>
          <div>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Signup
            </h2>
          </div>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900 text-left"
              >
                Name <span className="text-red-400">*</span>
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Enter Your Name"
                  {...register("name")}
                  className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 pl-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900 text-left"
              >
                Email <span className="text-red-400">*</span>
              </label>

              <div className="mt-2">
                <input
                  type="text"
                  id="signup-email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Enter a Valid Email"
                  {...register("email")}
                  className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 pl-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 text-left"
              >
                Create Password <span className="text-red-400">*</span>
              </label>

              <div className="mt-2">
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  required
                  autoComplete="password"
                  placeholder="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
                  {...register("password")}
                  className="block w-full md:min-w-[300px] md:max-w-[500px] rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
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
                {isButtonLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              <p className="text-center text-sm text-gray-400">
                Already Have an Account -{" "}
                <span
                  className="cursor-pointer text-cyan-500"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
