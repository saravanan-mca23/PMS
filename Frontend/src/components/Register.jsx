import { useState } from "react";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaUserTie, FaUserShield } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(formData);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
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
            onClick={() => navigate("/login")} 
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="md:flex h-full">
            {/* Left Side - Illustration */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-8 text-white">
              <div className="flex flex-col h-full justify-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
                <p className="mb-8 text-blue-100">
                  Register to access the company portal and collaborate with your team members.
                </p>
                <div className="bg-blue-400 bg-opacity-30 rounded-lg p-4">
                  <p className="flex items-center mb-2">
                    <FaUserTie className="mr-2" /> Employee Access
                  </p>
                  <p className="flex items-center">
                    <FaUserShield className="mr-2" /> Team Lead Privileges
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-10">
              <div className="mb-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-gray-600 mt-1">Fill in your details to register</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                    <FaUser className="text-gray-500 mr-3" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full focus:outline-none bg-transparent"
                      required
                    />
                  </div>

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
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-gray-700 mb-3 font-medium">Account Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.role === "employee" ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`}>
                      <input
                        type="radio"
                        name="role"
                        value="employee"
                        checked={formData.role === "employee"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center">
                        <FaUserTie className="text-2xl mb-2 text-gray-700" />
                        <span className="font-medium">Employee</span>
                        <span className="text-sm text-gray-500 mt-1">Standard access</span>
                      </div>
                    </label>

                    <label className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.role === "TL" ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`}>
                      <input
                        type="radio"
                        name="role"
                        value="TL"
                        checked={formData.role === "TL"}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center">
                        <FaUserShield className="text-2xl mb-2 text-gray-700" />
                        <span className="font-medium">Team Lead</span>
                        <span className="text-sm text-gray-500 mt-1">Admin privileges</span>
                      </div>
                    </label>
                  </div>
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already registered?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Sign in here
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

export default Register;