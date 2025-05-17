import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigateTo = useNavigate();
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  console.log("loginError from login page:", loginError);

  const handleChange = (e) => {
    updateLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(e);
      navigateTo("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full space-y-6 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>
        
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={loginInfo?.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {loginError?.email && (
              <p className="text-red-500 text-xs mt-1">{loginError.email}</p>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-xs text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Forgot password?
              </div>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={loginInfo?.password}
              onChange={handleChange}
              placeholder="••••••••••••"
            />
            {loginError?.password && (
              <p className="text-red-500 text-xs mt-1">
                {loginError.password}
              </p>
            )}
          </div>

          {loginError && (
            <div className="bg-red-50 px-4 py-3 rounded-lg">
              <p className="text-red-600 text-sm">{loginError.message}</p>
            </div>
          )}
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
              Create an account
            </Link>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
          <p className="text-xs text-gray-500 font-medium mb-1">Demo credentials:</p>
          <div className="text-sm text-gray-700">
            <p><span className="font-medium">Email:</span> Kirissh.edu@gmail.com</p>
            <p><span className="font-medium">Password:</span> kevin2006*</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
