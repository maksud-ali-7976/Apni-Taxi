import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import axios from "axios";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const emailSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/forgot-password`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate(`/reset-password/${res.data.token}`);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        {/* NavBar with higher z-index */}
        <div className="fixed top-0 left-0 w-full z-50">
          <NavBar />
        </div>

        <div
          className=" flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 lg:flex-row"
        >
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.9zFnstPlHn_mSs8rKCP0dwHaE8&pid=Api&P=0&h=180"
                  width={1000}
                  className="btn-"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div
                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                    relative z-10"
              >
                <form action="" onSubmit={emailSubmitHandler}>
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                    Forgot Password | We sent a Link Of Forgot Pass in Your
                    Email
                  </p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Enter Your Email Add
                      </p>
                      <input
                        placeholder="123@ex.com"
                        type="text"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border placeholder-gray-400 focus:outline-none
                                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                                border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="relative">
                      <button
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                                rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                        type="submit"
                      >
                        send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
