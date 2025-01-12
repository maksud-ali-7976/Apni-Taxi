import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Data } from "../../data/SideBarData";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setSideBarOpen }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="fixed">
      <h2
        className={` bg-yellow-200  p-2 flex items-center justify-center text-2xl font-semibold  underline ${
          !open && "text-[10px]"
        }`}
      >
        APNI-TAXI
      </h2>
      <div
        className={`bg-sky-400 fixed h-screen  p-5 pt-8 md:${
          open ? "w-[90vw]" : "w-20"
        }   ${open ? "w-40" : "w-20"} duration-0 relative `}
      >
        <FaArrowAltCircleRight
          className={`bg-white text-purple-950 text-3xl rounded-full absolute -right-3 top-9 border border-purple-950 cursor-pointer  ${
            !open && "rotate-180"
          }`}
          onClick={() => {
            setOpen(!open);
            setSideBarOpen(!open);
          }}
        />

        <div className="inline-flex">
          <img
            src="/taxi.png"
            alt=""
            className={`${open ? "w-20 h-10" : "w-10 h-5"} items-center `}
          />
        </div>
        <div className="flex items-center mt-10 w-full  gap-10 ">
          <ul className="flex flex-col  w-full">
            {Data.map((item, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-gray-200 rounded-md ${
                  !open && "hidden"
                } `}
                onClick={(e) => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
