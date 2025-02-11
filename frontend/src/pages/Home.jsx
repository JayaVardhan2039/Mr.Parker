import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://i.pinimg.com/736x/d5/8d/65/d58d65b1d8fd366d6d4ba7fe81af4194.jpg)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-8 invert' src="https://d2az9qivg16qd4.cloudfront.net/s3fs-public/Uber_Logo_Black_CMYK_Logo.png"></img>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Mr.Parker</h2>
                <Link to='/user-login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-4'>Continue</Link>
            </div>
        </div>
    </div>
)
}

export default Home