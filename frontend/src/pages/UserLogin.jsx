import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

export const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [UserData, setUserData] = useState({})
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const appName = "Mr.Parker"
    const submitHandler = async (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)
        if (response.status === 200) {
            const data = response.data
            localStorage.setItem('token',data.token)
            setUser(data.user)
            navigate('/home')
        }

        setEmail('')
        setpassword('')
    }
return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <span className="mr-2 quicksand absolute top-4 left-4 z-50 text-xl font-bold flex items-center">Mr.Parker</span>  
            
        <div className='mt-10'>
        <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your user email?</h3>
                    <input 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                    type="email" 
                    placeholder="Enter your email" 
                    />
                    <h3 className='text-lg font-medium mb-2'    >Enter your password</h3>
                    <input 
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder="Enter your password" />
                    <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>
                    <p className='text-center'>New here?<Link to='/user-register' className='text-blue-600'>Create an Account </Link></p>
            </form>
        </div>
        <div>
            <Link to='/mrparker-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Mr.Parker</Link>
        </div>
    </div>
)
}

export default UserLogin