import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <>
      <div className="form-wrapper w-100">
        <div className="mb-3">
          <span>welcome to PMS</span>
          <h3>Forget Password</h3>
        </div>
        <form className="">
          <div className="form-group my-3">
            <label htmlFor="E-mail" className="my-2">
              E-mail
            </label>
            <input
              type="email"
              className=" form-control "
              id="E-mail"
              placeholder="Enter Your E-mail"
            />
          </div>
          <button className="btn btn-auth d-block mt-5 w-100 ">Verify</button>
        </form>
      </div>
    </>
  );
}
