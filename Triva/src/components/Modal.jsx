import { createPortal } from "react-dom";
import { useState} from "react";
import LoginForm from "./LogInForm";
import SignupForm from "./SignupForm";

export default function Modal({ setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);

  return createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      >
        {/* Modal Box */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 text-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-md min-h-[50vh] max-h-[80vh] flex flex-col relative border border-gray-700"
        >
          {/* Header */}
          <h3 className="text-2xl font-bold text-center mb-6 text-yellow-400">
            {isLogin ? "Log In" : "Sign Up"}
          </h3>

          {/* Tabs */}
          <div className="flex text-lg font-semibold mb-4">
            <button
              className={`flex-1 p-3 rounded-t-lg transition duration-200 ${
                isLogin
                  ? "bg-gray-800 text-green-400 border-b-2 border-green-400"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`flex-1 p-3 rounded-t-lg transition duration-200 ${
                !isLogin
                  ? "bg-gray-800 text-yellow-400 border-b-2 border-yellow-400"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="flex-1 bg-gray-800 rounded-lg p-4 overflow-auto">
            <label className="block text-center text-gray-300 mb-4">
              Please Enter Your Details
            </label>
            {isLogin ? (
              <LoginForm setIsOpen={setIsOpen} />
            ) : (
              <SignupForm setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}