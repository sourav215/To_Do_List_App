import { toast } from "react-toastify";

export const CustomToast = ({ type, message }) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "toastify-custom",
  });
};
