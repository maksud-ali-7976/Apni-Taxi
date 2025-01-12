import React from "react";
import PayMethods from "../../data/Payment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const backedUrl = import.meta.env.VITE_BACKEND_URL;
const Payment = () => {
  const navigate = useNavigate();
  const { pickUpAdd, dropAdd, sourceCoordinates, destinationCoordinates,amount } =
    useSelector((state) => state.coordinatesReducer);
    console.log(amount)
  const bookingInfo = {
    pickUpAdd,
    dropAdd,
    pickUp: sourceCoordinates,
    drop: destinationCoordinates,
    amount,
  };

  const bookingHandler = async () => {
    const res = await axios.post(
      `${backedUrl}booking/taxi-booking`,
      { bookingInfo },
      {
        withCredentials: true,
      }
    );
    if (res.data.success == false) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate("/check-out", { replace: true });
    }
  };

  return (
    <div>
      <h2>Payment Methods</h2>
      <div className=" grid grid-cols-4 mt-1 p-4 ">
        {PayMethods.map((item, index) => (
          <div
            key={index}
            className="w-[50px]
                            border-[2px]
                            rounded-md
                            flex 
                            hover:scale-110 hover:border-yellow-300
                            items-center
                            justify-center"
          >
            <img src={item.image} alt="" className="w-[30px] h-[30px]" />
          </div>
        ))}
      </div>
      <button
        className={`p-2 mr-2 w-full  rounded-md ${
          !amount ? "bg-gray-300" : "bg-yellow-400"
        } `}
        onClick={bookingHandler}
      >
        Book Now
      </button>
    </div>
  );
};

export default Payment;
