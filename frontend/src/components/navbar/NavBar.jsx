import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { userLogout } from "../../toolkit/thunk/user";
import { useDispatch, useSelector } from "react-redux";
const NavBar = () => {
  const [menuItem, setMenuItems] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const logoutHandle = async () => {
    dispatch(userLogout());
  };
  return (
    <div>
      <div className="flex justify-between bg-yellow-400 border-[1px] p-1 text-xl text-white px-6 shadow-lg ">
        <div className=" flex items-center gap-10">
          <img src="/logo.png" alt="logo" className=" w-[110px] h-[30px]  " />

          <div>
            <ul className=" hidden md:flex gap-4 text-black">
              <li className="hover:bg-gray-400 p-1 hover:text-white rounded-md">
                Home
              </li>
              <li className="hover:bg-gray-400 p-1 hover:text-white rounded-md">
                History
              </li>
              <li className="hover:bg-gray-400 p-1 hover:text-white rounded-md">
                Help
              </li>
            </ul>
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={logoutHandle}
            className="p-1 hidden md:block w-[100px]  rounded-md bg-blue-500 ml-[100px]"
          >
            Logout
          </button>
        )}

        <img
          className=" hidden md:block  w-10 h-10   p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="/profile.jpg"
          alt="Bordered avatar"
        />

        {menuItem == true ? (
          <RxCross1
            className="mt-1 md:hidden "
            onClick={() => setMenuItems(false)}
          />
        ) : (
          <RiMenu3Line
            className="mt-1  md:hidden "
            onClick={() => setMenuItems(true)}
          />
        )}
      </div>
      {menuItem && (
        <div className=" md:hidden absolute top-10 right-2 bg-yellow-500 rounded-md shadow-lg p-4 w-30 ">
          <ul className="md:flex-col justify-between  space-y-2 ">
            <li className="hover:bg-gray-200 p-1 rounded-md  ">Home</li>
            <li className="hover:bg-gray-200 p-1 rounded-md ">History</li>
            <li className="hover:bg-gray-200 p-1 rounded-md ">Profile</li>
            <li className="hover:bg-gray-200 p-1 rounded-md ">Help</li>
            <li className="hover:bg-gray-200 p-1 rounded-md ">
              <button onClick={logoutHandle}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
