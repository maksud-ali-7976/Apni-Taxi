import axios from "axios";
import { useEffect, useState } from "react";
const base_url = import.meta.env.VITE_BACKEND_URL;
import { useDispatch } from "react-redux";

import {
  setDestinationCoordinates,
  setDrop,
  setPickup,
  setSourceCoordinates,
} from "../../toolkit/reducers/CoordinatesReducer";
const AutoAddress = () => {
  const dispatch = useDispatch();
  const [sourceAddress, setSourceAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const [sourceChange, setSourceChange] = useState(false);
  const [destinationChange, setDestinationsChange] = useState(false);
  const [destinations, setDestinations] = useState();

  useEffect(() => {
    if (!sourceAddress) {
      setAddressList([]);
      return;
    }

    const DelayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(DelayDebounceFn);
  }, [sourceAddress, destinations]);
  const getAddressList = async () => {
    const query = sourceChange ? sourceAddress : destinations;
    const res = await axios.get(
      `${base_url}booking/auto-completeAdd?q=${query}`
    );
    const result = await res.data;
    setAddressList(result.data);
  };

  const onSourceAddressClick = async (item) => {
    setSourceAddress(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const base_url = import.meta.env.VITE_MAP_BOX_RETRIVE_BASE_URL;
    const session_token = import.meta.env.SESSION_TOKEN;
    const res = await axios.get(
      `${base_url}${
        item.mapbox_id
      }?session_token=${session_token}&access_token=${
        import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN
      }`
    );

    const result = await res.data;
    dispatch(
      setSourceCoordinates({
        long: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      })
    );
  };

  const onDestinationClick = async (item) => {
    setDestinations(item.full_address);
    setAddressList([]);
    setDestinationsChange(false);
    const base_url = import.meta.env.VITE_MAP_BOX_RETRIVE_BASE_URL;
    const session_token = import.meta.env.SESSION_TOKEN;
    const res = await axios(
      `${base_url}${
        item.mapbox_id
      }?session_token=${session_token}&access_token=${
        import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN
      }`
    );

    const result = await res.data;
    // console.log(result)
    dispatch(
      setDestinationCoordinates({
        long: result.features[0]?.geometry.coordinates[0],
        lat: result.features[0]?.geometry.coordinates[1],
      })
    );
  };
  return (
    <div className="mt-1">
      <div>
        <label>Where From ?</label>
        <input
          value={sourceAddress || ""}
          onChange={(e) => {
            setSourceAddress(e.target.value);
            setSourceChange(true);
          }}
          type="text"
          placeholder="Enter Current Address"
          className="bg-white p-1 w-full border-[1px]
                 border-yellow-300 focus:border-red-900 outline-none rounded-lg focus:bg-slate-100 "
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md rounded-md p-1 absolutes">
            {addressList?.suggestions.map((item, index) => (
              <h2
                className="p-2 hover:bg-green-200 rounded-md w-full  cursor-pointer"
                key={index}
                onClick={() => {
                  onSourceAddressClick(item);
                  dispatch(setPickup(item.full_address));
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor="" className="">
          Where To?
        </label>
        <input
          type="text"
          placeholder="Enter Location"
          value={destinations || ""}
          onChange={(e) => {
            setDestinations(e.target.value);
            setDestinationsChange(true);
          }}
          className="bg-white p-1 w-full border-yellow-300 border-[1px]
     focus:border-red-900 outline-none rounded-lg focus:bg-slate-100"
        />
        {addressList?.suggestions && destinationChange ? (
          <div className="shadow-md rounded-md p-1 absolutes">
            {addressList?.suggestions.map((item, index) => (
              <h2
                className="p-2 hover:bg-green-200 rounded-md w-full cursor-pointer"
                onClick={() => {
                  onDestinationClick(item);
                  dispatch(setDrop(item.full_address));
                }}
                key={index}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoAddress;
