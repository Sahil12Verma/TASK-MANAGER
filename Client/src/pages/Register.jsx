import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  console.log("registerError", registerError);

  const handleChange = (e) => {
    updateRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(e);
    } catch (error) {
      console.error("Registration failed:", error);
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white px-20 border py-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="given-name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={registerInfo?.first_name}
              onChange={handleChange}
            />
            {registerError?.first_name && (
              <p className="text-red-500 text-xs italic">
                {registerError.first_name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              autoComplete="family-name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={registerInfo?.last_name}
              onChange={handleChange}
            />
            {registerError?.last_name && (
              <p className="text-red-500 text-xs italic">
                {registerError.last_name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={registerInfo?.email}
              onChange={handleChange}
            />
            {registerError?.email && (
              <p className="text-red-500 text-xs italic">
                {registerError.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              autoComplete="tel"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={registerInfo?.phone}
              onChange={handleChange}
            />
            {registerError?.phone && (
              <p className="text-red-500 text-xs italic">
                {registerError.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={registerInfo?.password}
              onChange={handleChange}
            />
            {registerError?.password && (
              <p className="text-red-500 text-xs italic">
                {registerError.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? "Creating your account..." : "Register"}
            </button>
          </div>
        </form>

        <div className="">
          {registerError && (
            <p className="text-red-500 mt-2">{registerError?.message}</p>
          )}

          <div className="mt-5">
            <span className="">
              I already have an Account!{" "}
              <span className="text-blue-500 ml-3">
                <Link to="/login">Login</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
