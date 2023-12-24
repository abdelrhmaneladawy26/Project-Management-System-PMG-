import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import axios from "axios";

type Inputs = {
  email: string;
  password: string;
};
export default function ResetPassword() {
  const { baseUrl }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Users/Reset`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="form-wrapper w-100">
        <div className="mb-3">
          <span>welcome to PMS</span>
          <h3>Reset Password</h3>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group my-3">
            <label htmlFor="E-mail" className="my-2">
              E-mail
            </label>
            <input
              type="email"
              className=" form-control "
              id="E-mail"
              placeholder="Enter Your E-mail"
              {...register("email", {
                required: true,
                pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-danger">email is required</span>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-danger">invalid email</span>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="verification" className="my-2">
              OTP Verification
            </label>
            <input
              type="text"
              className=" form-control "
              id="verification"
              placeholder="Enter Verification"
              {...register("seed", {
                required: true,
              })}
            />
            {errors.seed && errors.seed.type === "required" && (
              <span className="text-danger">OTP Verification is required</span>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="newPassword" className="my-2">
              New Password
            </label>
            <input
              type="password"
              className=" form-control "
              id="newPassword"
              placeholder="Enter your New Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-danger">New Password is required</span>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="newPassword" className="my-2">
              Confirm Password{" "}
            </label>
            <input
              type="password"
              className=" form-control "
              id="newPassword"
              placeholder="Enter your New Password"
              {...register("confirmPassword", {
                required: true,
              })}
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <span className="text-danger">
                  Confirm Password is required
                </span>
              )}
          </div>
          <button className="btn btn-auth d-block mt-5 w-100 ">Verify</button>
        </form>
      </div>
    </>
  );
}
