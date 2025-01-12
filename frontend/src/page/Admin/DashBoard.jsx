import React, { useEffect } from "react";
import AdminLayout from "./Layout/AdminLayout";
import Cards from "../../components/Admin/dashboard/Cards";
import { FaUsers } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa6";
import { Line, Bar } from "react-chartjs-2";
import { dataBar} from "../../data/ChartData";
import { analyticsData } from "../../toolkit/thunk/dataThunk";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(analyticsData());
  }, [dispatch]);
  const data = useSelector((state) => state.data.analyticsData);
  const dataLine = {
    labels: [
      "sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Stuerday",
    ],
    datasets: [
      {
        label: "booking",
        data: data,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="h-screen w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-3">
          <Cards icon={<FaUsers />} name={"Driver"} value={80} />
          <Cards icon={<IoCarSport />} name={"Taxis"} value={80} />
          <Cards icon={<FaChartPie />} name={"Income"} value={80} />
          <Cards icon={<FaUsers />} name={"Driver"} value={80} />
        </div>
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">Booking</h2>
            <Line data={dataLine} className="w-50 h-[10vh]" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Bar data={dataBar} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
