import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Table = ({
  Data,
  columns,
  onDelete,
  onUpdate,
  onDriverToggle,
  isDriverData,
}) => {
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentInfo, setPayment] = useState({ paidSalary: "" });
  const [id, setId] = useState();
  const navigate = useNavigate();

  const salaryPaidHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}admin/paid-salary/${id}`,
        { paymentInfo },
        { withCredentials: true }
      );
      if (res.data.success == false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/admin/drivers", { replace: true });
        setPaymentToggle(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white mt-10 mr-5 rounded-md">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800"></h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                {columns &&
                  columns.map((item, index) => (
                    <th key={index} className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">
                        {item.label}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="text-sm divide-y  divide-gray-100">
              {Data &&
                Data.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-100">
                    {isDriverData ? (
                      <>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src={item.image}
                                width={40}
                                height={40}
                                alt="Alex Shatov"
                              />
                            </div>
                            <div className="font-medium text-gray-800">
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.phone}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-green-500">
                            {item.address}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg ">{item.salary}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg ">{item.paidSalary}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <button
                            className="p-1 w-30 bg-red-500 rounded-lg mr-2"
                            onClick={() => onDelete(item._id)}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              onDriverToggle(true), onUpdate(item._id);
                            }}
                            className="p-1 w-30 bg-green-500 rounded-md"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setPaymentToggle(true);
                              setId(item._id);
                            }}
                            className="p-1 w-30 bg-blue-500 rounded-md ml-3"
                          >
                            Pay Salary
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-800">
                              {item.pickUpAdd}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.dropAdd}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg ">{item.amount}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg ">
                            {" "}
                            {new Date(item.bookingTime).toLocaleTimeString(
                              "en-GB"
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {paymentToggle && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
          <section className=" p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10">
            <h2 className="text-lg font-semibold  text-gray-700 capitalize dark:text-white">
              Salary Pay Form
            </h2>
            <form onSubmit={salaryPaidHandler}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="username"
                  >
                    Salary Amount
                  </label>
                  <input
                    id="username"
                    type="number"
                    value={paymentInfo.paidSalary}
                    onChange={(e) => {
                      setPayment({
                        ...paymentInfo,
                        paidSalary: e.target.value,
                      });
                    }}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="description"
                  >
                    Descriptions
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    value={paymentInfo.description}
                    onChange={(e) =>
                      setPayment({
                        ...paymentInfo,
                        description: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
              </div>
              <div className="flex justify-start mt-6 gap-10 text-black">
                <button
                  type="submit"
                  className="px-6 py-2 w-[45%] leading-5  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
                >
                  Pay
                </button>
                <button
                  onClick={() => setPaymentToggle(false)}
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
  );
};
export default Table;
