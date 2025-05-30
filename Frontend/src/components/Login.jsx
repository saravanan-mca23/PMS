import { useState } from "react";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowLeft, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser(formData);
  
      if (data && data.token && data.user) {
        const { token, user } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        toast.success(`Welcome ${user.name || user.role}!`);
        if(user.role === "employee"){
          navigate("/EmployeeDashboard");
        } else {
          navigate("/TLDashboard");
        }
      } else {
        toast.error("Login failed: No valid data returned.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Company Portal</h1>
          <button 
            onClick={() => navigate("/register")} 
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Create Account
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="md:flex h-full">
            {/* Left Side - Illustration */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
              <div className="flex flex-col h-full justify-center">
                <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                <p className="mb-8 text-blue-100">
                  Sign in to access your dashboard and continue your work.
                </p>
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-4">
                  <p className="flex items-center mb-2">
                    <FaLock className="mr-2" /> Secure login
                  </p>
                  <p className="flex items-center">
                    <FaSignInAlt className="mr-2" /> Quick access
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                <p className="text-gray-600 mt-1">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                    <FaEnvelope className="text-gray-500 mr-3" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full focus:outline-none bg-transparent"
                      required
                      autoComplete="username"
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                    <FaLock className="text-gray-500 mr-3" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full focus:outline-none bg-transparent"
                      required
                      minLength="6"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {/* <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label> */}
                  {/* <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot password?
                  </button> */}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center
                    ${isLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'}
                  `}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 px-6 border-t flex-shrink-0">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Login;