import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import "./Login.module.css";
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { baseUrl, saveUserData }:any = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Users/Login`, data)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token);
        toast.success("Welcome");
        saveUserData();
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className="form-wrapper w-100">
        <div className="mb-5">
          <span>welcome to PMS</span>
          <h3>Login</h3>
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
            <label htmlFor="password" className="my-2">
              Password
            </label>
            <input
              type="Password"
              className=" form-control "
              id="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-danger">Email is required</span>
            )}
          </div>
          <div className="d-flex justify-content-between ">
            <Link className="btn text-white" to="/register">
              Register Now ?
            </Link>
            <Link className="btn text-white" to="/reset-password">
              Forget Password ?
            </Link>
          </div>
          <button type="submit" className="btn btn-auth d-block mt-3 w-100 ">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
