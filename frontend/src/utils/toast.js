import toast from "react-hot-toast";

const defaultError = "Something went wrong";

export const notify = {
  success: (message) => {
    toast.success(message);
  },

  error: (message = defaultError) => {
    toast.error(message);
  },

  loading: (message = "Please wait...") => {
    return toast.loading(message);
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || defaultError,
    });
  },
};