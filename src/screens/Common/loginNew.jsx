import React, { useState } from "react";
import Logo from "./images/logo.jpg";

const LoginNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);
  const switchForm = () => setIsSignup(!isSignup);

  return (
    <div className="relative">
      <header className="fixed w-full top-0 left-0 z-20 p-2">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <button
            className="material-symbols-rounded text-white text-3xl md:hidden"
            onClick={toggleMenu}
          >
            menu
          </button>
          <a href="#" className="flex items-center gap-2 text-white">
            <img src={Logo} alt="logo" className="w-10 rounded-full" />
            <h2 className="font-semibold text-2xl">CodingNepal</h2>
          </a>
          <ul
            className={`flex gap-8 items-center md:static md:flex ${
              isMenuOpen ? "fixed" : "hidden"
            } top-0 left-0 w-full h-screen bg-white md:bg-transparent p-16 md:p-0 md:h-auto md:w-auto z-10`}
          >
            <button
              className="material-symbols-rounded text-black text-3xl absolute top-5 right-5 md:hidden"
              onClick={toggleMenu}
            >
              close
            </button>
            <li>
              <a
                href="#"
                className="text-black md:text-white hover:text-teal-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black md:text-white hover:text-teal-500"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black md:text-white hover:text-teal-500"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black md:text-white hover:text-teal-500"
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black md:text-white hover:text-teal-500"
              >
                Contact us
              </a>
            </li>
          </ul>
          <button
            className="hidden md:block bg-white text-teal-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200"
            onClick={togglePopup}
          >
            LOG IN
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-10 backdrop-blur-md transition-opacity ${
          isPopupVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={togglePopup}
      ></div>

      <div
        className={`fixed inset-1/2 z-20 max-w-lg w-full bg-white border-2 border-white p-6 transform -translate-x-1/2 ${
          isPopupVisible ? "-translate-y-1/2" : "-translate-y-full"
        } transition-transform`}
      >
        <button
          className="material-symbols-rounded text-gray-500 absolute top-4 right-4"
          onClick={togglePopup}
        >
          close
        </button>
        <div className="flex">
          <div
            className={`w-full max-w-sm text-center text-white p-8 hidden md:block ${
              isSignup ? "bg-white" : "bg-white"
            } bg-cover`}
          >
            <h2 className="text-3xl mb-4">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p>
              {isSignup
                ? "Sign up to become a part of our community."
                : "Log in to stay connected with us."}
            </p>
          </div>

          <div className="w-full p-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              {isSignup ? "SIGNUP" : "LOGIN"}
            </h2>
            <form>
              <div className="relative mb-6">
                <input
                  type="text"
                  required
                  className="peer block w-full p-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all peer-focus:top-1 peer-focus:text-sm peer-focus:text-teal-500 peer-valid:top-1 peer-valid:text-sm">
                  {isSignup ? "Enter your email" : "Email"}
                </label>
              </div>
              <div className="relative mb-4">
                <input
                  type="password"
                  required
                  className="peer block w-full p-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 transition-all peer-focus:top-1 peer-focus:text-sm peer-focus:text-teal-500 peer-valid:top-1 peer-valid:text-sm">
                  {isSignup ? "Create password" : "Password"}
                </label>
              </div>
              {isSignup && (
                <div className="flex items-center mb-6">
                  <input type="checkbox" id="policy" className="w-4 h-4 mr-2" />
                  <label htmlFor="policy">
                    I agree to the{" "}
                    <a href="#" className="text-teal-500">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
              )}
              {!isSignup && (
                <a href="#" className="text-teal-500 block mb-6">
                  Forgot password?
                </a>
              )}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                {isSignup ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className="text-center mt-6">
              {isSignup ? (
                <span>
                  Already have an account?{" "}
                  <button className="text-teal-500" onClick={switchForm}>
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{" "}
                  <button className="text-teal-500" onClick={switchForm}>
                    Signup
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
