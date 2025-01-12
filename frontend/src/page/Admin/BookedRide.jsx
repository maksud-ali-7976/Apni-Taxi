import React, { useEffect, useState } from "react";
import Table from "./Layout/Table";
import AdminLayout from "./Layout/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { allBookedRides } from "../../toolkit/thunk/dataThunk";
const BookedRide = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPage = useSelector((state) => state.data.totalBookingPage);
  const allBookedRide = useSelector((state) => state.data.allBookedRides);

  useEffect(() => {
    dispatch(allBookedRides({ page: page, limit: limit }));
  }, [page, limit, dispatch]);

  const PreviousPage = async () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const NextPage = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  return (
    <AdminLayout>
      <div className="min-h-screen overflow-hidden">
        <div className="w-[30vh]">
          <h2 className="text-2xl font-semibold">DashBoard/Booked Ride</h2>
        </div>

        <div className="md:flex gap-4">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-1 mt-10 w-[250px] border-[2px] outline-none rounded-md"
            />
          </div>

          <button className=" mt-10 p-1 w-[250px] bg-green-400 rounded-md">
            Search
          </button>
        </div>

        {/* Table */}
        <Table
          Data={allBookedRide}
          columns={[
            { key: "name", label: "PickUp Address" },
            { key: "phone", label: "Drop Address" },
            { key: "address", label: "Amount" },
            { key: "salary", label: "Booking Time" },
          ]}
          isDriverData={false}
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
      </div>
    </AdminLayout>
  );
};

export default BookedRide;
