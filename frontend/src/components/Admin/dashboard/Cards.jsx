import React from 'react'

const Cards= ({ name, icon, value }) => {
    return (
        <div>
            <div className='bg-gray-200 text-dark p-4 rounded-lg shadow-md flex items-center'>
                <div className='text-3xl text-gray-500'>{icon}</div>
                <div>
                    <h2 className='text-lg font-semibold'>{name}</h2>
                    <p className='text-lg'>{value}</p>
                </div>
            </div>
        </div>
    )
}

export default Cards