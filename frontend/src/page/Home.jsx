
import { useEffect } from "react"
import Booking from "../components/booking/Booking"
import MapBOx from "../components/Map/MapBOx"
import NavBar from "../components/navbar/NavBar"
import { useDispatch } from "react-redux"
import { setUserLocations } from '../toolkit/reducers/CoordinatesReducer';
function Home() {
    useEffect(() => {
        getUserCurrentLocation()
    });
    const dispatch= useDispatch();

    const getUserCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((prs) => {
            dispatch(setUserLocations({ long: prs.coords.longitude, lat: prs.coords.latitude }))

        })
    }
    return (
        <>
            <NavBar />
            <div className=" grid grid-cols-1 md:grid-cols-3">
                <div>
                    <Booking />
                </div>
                <div className="col-span-2 order-last">
                    <MapBOx />
                </div>
            </div>
        </>
    )
}

export default Home
