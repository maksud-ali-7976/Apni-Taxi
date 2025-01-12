import React, { useEffect, useState } from "react";
import AdminLayout from "./Layout/AdminLayout";
import Table from "./Layout/Table";
import { allDriverFetch } from "../../toolkit/thunk/dataThunk";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Drivers = () => {
  const navigate = useNavigate();
  const [driverUpdateToggle, setDriverUpdateToggle] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 2;
  const [search, setSearch] = useState("");
  const totalPage = useSelector((state) => state.data.totalPage);

  useEffect(() => {
    dispatch(
      allDriverFetch({
        page: page,
        limit: limit,
        search: search,
      })
    );
  }, [page, limit, dispatch]);
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    address: "",
    phone: "",
    salary: null,
    vehicleType: "",
  });
  const [addDriverToggle, setAddDriverToggle] = useState(false);
  const [file, setFile] = useState();
  const drivers = useSelector((state) => state.data.drivers);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}admin/delete-driver/${id}`, {
        withCredentials: true,
      });

      const result = await res.data;
      if (result.data.success == false) {
        toast.error(result.data.message);
      } else {
        toast.success(result.data.message);
        navigate("/admin/drivers", { replace: true });
      }
    } catch (error) {}
  };
  const editHandler = async (id) => {
    try {
      const res = await axios.get(`${backendUrl}admin/driver/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setDriverInfo(res.data.driver);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const SubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      formData.append("data", JSON.stringify(driverInfo));
      const response = await axios.post(
        `${backendUrl}admin/driver-add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.success == false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate("/admin/drivers", { replace: true });
        setAddDriverToggle(false);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}admin/driver-update/${driverInfo._id}`,
        { driverInfo },
        { withCredentials: true }
      );
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/admin/drivers", { replace: true });
        setDriverUpdateToggle(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const searchHandler = async () => {
    try {
      setPage(1);
      dispatch(allDriverFetch({ page, limit, search }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const PreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const NextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  return (
    <AdminLayout>
      <div className="min-h-screen overflow-hidden">
        <div className="w-[30vh]">
          <h2 className="text-2xl font-semibold">DashBoard/Drivers</h2>
        </div>
        <div className="flex mt-4 mr-5  items-end justify-end">
          <button
            onClick={() => setAddDriverToggle(true)}
            className="p-1 text-white text-[15px] font-semibold bg-orange-400 rounded-lg"
          >
            + Add Drivers
          </button>
        </div>
        <div className="md:flex gap-4">
          <div className=" mt-10">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-1 w-[250px] border-[2px] outline-none rounded-md"
            />
          </div>

          <button
            onClick={searchHandler}
            className="md:mt-10 mt-3 p-1 w-[250px] bg-green-400 rounded-md"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <Table
          Data={drivers}
          columns={[
            { key: "name", label: "DriverName" },
            { key: "phone", label: "Phone" },
            { key: "address", label: "Address" },
            { key: "salary", label: "Salary" },
            { key: "paidSalary", label: "PaidSalary" },
            { key: "actions", label: "Actions" },
          ]}
          isDriverData={true}
          onDelete={deleteHandler}
          onUpdate={editHandler}
          onDriverToggle={setDriverUpdateToggle}
        />
        <div className="flex items-center justify-between py-6">
          <button
            className="text-gray-600 hover:text-indigo-700"
            onClick={PreviousPage}
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPage }, (_, index) => (
              <span key={index + 1} className="page-number">
                {index + 1}
              </span>
            ))}
          </div>
          <button
            className="text-gray-600 hover:text-indigo-700"
            onClick={NextPage}
          >
            Next
          </button>
        </div>
        {addDriverToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
              <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
                Drivers Form
              </h2>
              <form encType="multipart/form-data" onSubmit={SubmitHandler}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="username"
                    >
                      Driver Name
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={driverInfo.name}
                      onChange={(e) =>
                        setDriverInfo({ ...driverInfo, name: e.target.value })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="emailAddress"
                    >
                      Driver Address
                    </label>
                    <input
                      id="Address"
                      type="text"
                      value={driverInfo.address}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          address: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="password"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      value={driverInfo.phone}
                      onChange={(e) =>
                        setDriverInfo({ ...driverInfo, phone: e.target.value })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="passwordConfirmation"
                    >
                      Salary
                    </label>
                    <input
                      id="salary"
                      type="number"
                      value={driverInfo.salary || ""}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          salary: Number(e.target.value),
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Vehicle
                    </label>
                    <select
                      id="vehicles"
                      value={driverInfo.vehicleType}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          vehicleType: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>Select Vehicles</option>
                      <option>Taxi</option>
                      <option>HatchBag</option>
                      <option>Off Road </option>
                    </select>
                  </div>
                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                    name="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="flex justify-start mt-6 gap-10 text-black">
                  <button
                    type="submit"
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setAddDriverToggle(false)}
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

        {driverUpdateToggle && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
              <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
                Drivers Form
              </h2>
              <form onSubmit={updateHandler}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="username"
                    >
                      Driver Name
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={driverInfo.name}
                      onChange={(e) =>
                        setDriverInfo({ ...driverInfo, name: e.target.value })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="emailAddress"
                    >
                      Driver Address
                    </label>
                    <input
                      id="Address"
                      type="text"
                      value={driverInfo.address}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          address: e.target.value,
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="password"
                    >
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      value={driverInfo.phone}
                      onChange={(e) =>
                        setDriverInfo({ ...driverInfo, phone: e.target.value })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="passwordConfirmation"
                    >
                      Salary
                    </label>
                    <input
                      id="salary"
                      type="number"
                      value={driverInfo.salary || ""}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          salary: Number(e.target.value),
                        })
                      }
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Vehicle
                    </label>
                    <select
                      id="vehicles"
                      value={driverInfo.vehicleType}
                      onChange={(e) =>
                        setDriverInfo({
                          ...driverInfo,
                          vehicleType: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>Select Vehicles</option>
                      <option>Taxi</option>
                      <option>HatchBag</option>
                      <option>Off Road </option>
                    </select>
                  </div>
                  <input
                    className="block w-full mb-5 text-xs text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                    name="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="flex justify-start mt-6 gap-10 text-black">
                  <button
                    type="submit"
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setDriverUpdateToggle(false)}
                    className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Drivers;
