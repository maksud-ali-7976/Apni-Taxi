import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { EmailVerifyThunk } from "../toolkit/thunk/user";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
const EmailVerify = () => {
  const navigate = useNavigate();
  const [otpInfo, setOtpInfo] = useState({ otp: "" });
  const dispatch = useDispatch();

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(EmailVerifyThunk({ otpInfo, navigate }));
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
                {" "}
                <form action="" onSubmit={onOtpSubmit}>
                  <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                    Email Verification | We sent a Verifications Code in Your
                    Email
                  </p>
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Verification Code
                      </p>
                      <input
                        placeholder="123@ex.com"
                        type="text"
                        value={otpInfo.otp}
                        onChange={(e) =>
                          setOtpInfo({ ...otpInfo, otp: e.target.value })
                        }
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
                        Verify
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

export default EmailVerify;
