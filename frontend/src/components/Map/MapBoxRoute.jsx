
import { Source, Layer } from "react-map-gl";
const MapBoxRoute = (props) => {
  return (
    <div>
      <Source
        type="geojson"
        data={{
          type: "Feature",
          geometry: { type: "LineString", coordinates: props.coordinates },
        }}
      >
        <Layer
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{ "line-color": "#0464d4", "line-width": 4 }}
        />
      </Source>
    </div>
  );
};

export default MapBoxRoute;
