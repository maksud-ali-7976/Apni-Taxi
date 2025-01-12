import { useState } from "react";
import Cars from "../../data/Car";

import { useDispatch, useSelector } from "react-redux";
import { setCarAmount } from "../../toolkit/reducers/CoordinatesReducer";
const Car = () => {
  const [selectedCar, setSelectedCar] = useState();
  const directionRoute = useSelector(
    (state) => state.coordinatesReducer.destinationRoute
  );
  const dispatch = useDispatch();

  const getAmount = (item) => {
    const amount = getCost(item.price);
    console.log(amount)
    dispatch(setCarAmount(amount));
  };
  const getCost = (price) => {
    return Number((price * directionRoute[0]?.distance * 0.001).toFixed(2));
  };

  return (
    <div className="mt-2">
      <h2 className="text-[20px] font-semibold">Select Car</h2>
      <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-3">
        {Cars.map((item, index) => (
          <div
            key={index}
            className={`m-1 p-2 border-[2px] hover:border-yellow-400  cursor-pointer 
                            ${
                              index == selectedCar
                                ? "border-[2px] border-yellow-500"
                                : null
                            } hover:scale-110  `}
            onClick={() => {
              setSelectedCar(index);
              getAmount(item);
            }}
          >
            <div className="w-full">
              <img
                src={item.image}
                alt="image"
                className="w-[110px] h-[50px]"
              />
            </div>
            <h2 className="text-[10px] font-semibold mt-2">
              {item.name}
              <span className="float-right">
                {getCost(item.price) ? getCost(item.price) : 0} $
              </span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Car;
