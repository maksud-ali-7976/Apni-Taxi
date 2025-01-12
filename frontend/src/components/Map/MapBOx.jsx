import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import {} from "react-redux";
import { setDestinationRoute } from "../../toolkit/reducers/CoordinatesReducer";

import axios from "axios";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";
const MapBOx = () => {
  const dispatch = useDispatch();
  const mapRef = useRef (null);
  const userLocations = useSelector(
    (state) => state.coordinatesReducer.userLocation
  );
  const SourceCoordinates = useSelector(
    (state) => state.coordinatesReducer.sourceCoordinates
  );
  const DestinationsCoordinates = useSelector(
    (state) => state.coordinatesReducer.destinationCoordinates
  );
  const directionRoute = useSelector(
    (state) => state.coordinatesReducer.destinationRoute
  );

  useEffect(() => {
    if (SourceCoordinates?.long && SourceCoordinates?.lat) {
      mapRef.current?.flyTo({
        center: [SourceCoordinates.long, SourceCoordinates.lat],
        durations: 2500,
      });
    }
  }, [SourceCoordinates]);
  useEffect(() => {
    if (DestinationsCoordinates?.long && DestinationsCoordinates?.lat) {
      mapRef.current?.flyTo({
        center: [DestinationsCoordinates.long, DestinationsCoordinates.lat],
        durations: 2500,
      });
      if (SourceCoordinates && DestinationsCoordinates) {
        getDirectionRouteDetails();
      }
    }
  }, [DestinationsCoordinates]);

  const getDirectionRouteDetails = async () => {
    const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox/driving/";
    const res = await axios.get(
      `${BASE_URL}${SourceCoordinates.long},${SourceCoordinates.lat};${
        DestinationsCoordinates.long
      },${
        DestinationsCoordinates.lat
      }?overview=full&geometries=geojson&access_token=${
        import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN
      }`
    );
    const result = await res.data;
    dispatch(setDestinationRoute(result.routes));
  };

  return (
    <div className="p-5 ">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="mt-3 rounded-md overflow-hidden">
        {userLocations?.long && userLocations?.lat ? (
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN}
            ref={mapRef}
            initialViewState={{
              longitude: userLocations?.long,
              latitude: userLocations?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionRoute[0]?.geometry ? (
              <MapBoxRoute
                coordinates={directionRoute[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute right-[20px] bottom-[80px] z-10">
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBOx;
