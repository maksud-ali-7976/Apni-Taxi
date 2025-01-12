import React, { useState } from "react";
import Navbar from "../../../components/Admin/Navbar";
import SideBar from "../../../components/Admin/SideBar";

const AdminLayout = ({ children }) => {
  const [sideOpen, setSideBarOpen] = useState(true);
  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 ${
          sideOpen ? "w-60" : "w-20"
        }  transition-all duration-200  ease-in-out`}
      >
        <SideBar setSideBarOpen={setSideBarOpen} />
      </div>

      <div
        className={`w-full transition-all duration-200 ease-in-out ${
          sideOpen ? "ml-[200px]" : "ml-[100px]"
        } `}
      >
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-10">
          <Navbar />
        </div>

        {/* Content Area */}
        <div className="pt-[60px]  overflow-auto min-h-screen bg-gray-50  md:min-h-screen ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
