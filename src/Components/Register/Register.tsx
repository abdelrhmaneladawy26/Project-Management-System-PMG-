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

export default function Register() {
  const { baseUrl }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Users/Register`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/verify-user");
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
          <h3>Create New Account</h3>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group my-3">
                <label htmlFor="userName" className="my-2">
                  User Name
                </label>
                <input
                  type="text"
                  className=" form-control "
                  id="userName"
                  placeholder="Enter your name"
                  {...register("userName", {
                    required: true,
                  })}
                />
                {errors.userName && errors.userName.type === "required" && (
                  <span className="text-danger">user Name is required</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
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
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group my-3">
                <label htmlFor="country" className="my-2">
                  Country
                </label>
                <input
                  type="text"
                  className=" form-control "
                  id="country"
                  placeholder="Enter your country"
                  {...register("country", {
                    required: true,
                  })}
                />
                {errors.country && errors.country.type === "required" && (
                  <span className="text-danger">Your country is required</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group my-3">
                <label htmlFor="phone" className="my-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  className=" form-control "
                  id="phone"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: true,
                  })}
                />
                {errors.phoneNumber &&
                  errors.phoneNumber.type === "required" && (
                    <span className="text-danger">
                      your phone number is required
                    </span>
                  )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group my-3">
                <label htmlFor="password" className="my-2">
                  Password
                </label>
                <input
                  type="password"
                  className=" form-control "
                  id="password"
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger"> Password is required</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group my-3">
                <label htmlFor="newPassword" className="my-2">
                  Confirm Password{" "}
                </label>
                <input
                  type="password"
                  className=" form-control "
                  id="newPassword"
                  placeholder="Confirm New Password"
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
            </div>
          </div>

          <button className="btn btn-auth d-block mt-5 w-100 ">Save</button>
        </form>
      </div>
    </>
  );
}
