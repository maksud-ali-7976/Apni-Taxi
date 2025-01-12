import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className=' flex justify-between p-1 border-[1px] bg-yellow-300 px-6 text-white shadow-lgs'>
                <div className='flex items-center gap-10'>
                    <img src="/logo.png" alt="" className=' w-[100px] h-[30px]' />
                    <div>
                        <ul className='hidden md:flex  gap-10'>
                            <li>Home  </li>
                            <li>Profile</li>
                            <li>Help</li>
                        </ul>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Navbar