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
export default function VerifyUser() {
  const { baseUrl }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => {
    axios
      .put(`${baseUrl}/Users/verify`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="form-wrapper w-100">
        <div className="mb-3">
          <span>welcome to PMS</span>
          <h3>Verify Account</h3>
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
              {...register("code", {
                required: true,
              })}
            />
            {errors.code && errors.code.type === "required" && (
              <span className="text-danger">OTP Verification is required</span>
            )}
          </div>
          <button className="btn btn-auth d-block mt-5 w-100 ">Save</button>
        </form>
      </div>
    </>
  );
}
