import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className='w-full flex flex-row justify-between text-black bg-slate-50'>
            <h1 className='px-3 font-semibold tracking-tight text-2xl mx-3'>Weath.io</h1>
            <div>
                <ul className='flex flex-row gap-5 mx-3 items-center'>
                    <li className='hover:font-bold'><a>Home</a></li>
                    <li className='hover:font-bold'><a>Contact</a></li>
                    <li className='hover:font-bold'><a href='https://openweathermap.org/api' target='_blank'>API</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
