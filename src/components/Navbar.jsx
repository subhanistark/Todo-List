import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar flex justify-between bg-violet-950 text-white px-3">
            <span className='text-xl font-bold mx-3 my-4'>ZQUAD</span>
            <ul className='flex justify-center gap-6 mx-8 my-4'>
                <li className='text-sm hover:font-bold'>Home</li>
                <li className='text-sm hover:font-bold'>About</li>
            </ul>
        </div>
    )
}

export default Navbar
