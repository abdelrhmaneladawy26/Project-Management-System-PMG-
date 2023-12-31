import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
export default function UpdateProject() {
  const navigate = useNavigate();
  const { baseUrl, requestHeaders } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post(`${baseUrl}/Project`, data, { headers: requestHeaders })
      .then((res) => {
        toast.success("Added successfully");
        navigate("/dashboard/projects");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      {" "}
      <div className="header bg-white my-4 p-3">
        <span
          onClick={() => {
            navigate("/dashboard/projects");
          }}
        >
          {" "}
          <li className="fa fa-arrow-left"></li> View All Projects
        </span>
        <h3>Update Project</h3>
      </div>
      <div className=" bg-white w-75 m-auto p-5 ">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group my-3">
            <label htmlFor="title" className="my-2">
              Title
            </label>
            <input
              type="text"
              className=" form-control "
              id="title"
              placeholder="Name"
              {...register("title", {
                required: true,
              })}
            />
            {errors.title && errors.title.type === "required" && (
              <span className="text-danger">title is required</span>
            )}
          </div>
          <div className="form-group my-3">
            <label htmlFor="password" className="my-2">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              {...register("description", {
                required: true,
              })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <span className="text-danger">Description is required</span>
            )}
          </div>
          <div className="d-flex justify-content-between ">
            <Link
              className="btn bg-white text-dark border-1 border-dark "
              to="/dashboard/projects"
            >
              Cancel
            </Link>
            <button className="btn  border-1 border-dark">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
