import React from 'react'
import { useSelector } from 'react-redux';


const DistanceTime = () => {
    const directionRoute = useSelector((state) => state.coordinatesReducer.destinationRoute);

    return (
        <div>
            {
                directionRoute ?
                    <div className=' bg-yellow-400 p-3'>
                        <h2 className='text-yellow-100  opacity-[80px] text-[14px]'>
                            Distance : <span className='text-black mr-3 font-semibold'>{directionRoute[0]?.distance ? (directionRoute[0]?.distance * 0.001).toFixed(2) : null}KM</span>
                            Time : <span className='text-black mr-3 font-semibold'>{directionRoute[0]?.duration ? (directionRoute[0]?.duration / 60).toFixed(2) : null}MIN</span>
                        </h2>
                    </div>
                    : null}
        </div>
    )
}

export default DistanceTime