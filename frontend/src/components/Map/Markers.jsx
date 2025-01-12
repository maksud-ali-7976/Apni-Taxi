import React from 'react'
import { Marker } from 'react-map-gl'
import { useSelector } from 'react-redux'

const Markers = () => {
    const userLocations = useSelector((state) => state.coordinatesReducer?.userLocation);
    const SourceCoordinates = useSelector((state) => state.coordinatesReducer.sourceCoordinates);
    const DestinationCoordinates = useSelector((state) => state.coordinatesReducer.destinationCoordinates)

    return (
        <div>
            <Marker longitude={userLocations?.long} latitude={userLocations?.lat} anchor='bottom'>
                <img src='/icon.png' alt='logo' className='w-[50px] h-[50px]' />
            </Marker>
            {
                SourceCoordinates ?
                    <Marker longitude={SourceCoordinates?.long} latitude={SourceCoordinates?.lat} anchor='bottom'>
                        <img src="/icon.png" alt="icon" className='w-[50px] h-[50px]' />
                    </Marker>
                    : null
            }
            {
                DestinationCoordinates ?
                    <Marker longitude={DestinationCoordinates?.long} latitude={DestinationCoordinates?.lat} anchor='bottom'>
                        <img src="/icon.png" alt="icon" className='w-[50px] h-[50px]' />
                    </Marker>
                    : null
            }
        </div>
    )
}

export default Markers