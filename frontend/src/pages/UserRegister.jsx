import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext';

export const UserRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({});
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password,
            phonenumber: phonenumber,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            }
        };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token',data.token);
                navigate('/home');
            }
        

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
        setPhonenumber('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <span className="mr-2 quicksand absolute top-4 left-4 z-50 text-xl font-bold flex items-center">Mr.Parker</span>  
            
            <div className='mt-10'><form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's your Name?</h3>
                    <div className='flex gap-3 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder="First name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder="Last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter your password</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>What's your phone number?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="text"
                        placeholder="Enter your phone number"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-3 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>
                    <div className='flex gap-3 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="number"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="bicycle">Bicycle</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="lorry">Lorry</option>
                        </select>
                    </div>
                    <button className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg'>Create Account</button>
                    <p className='text-center'>Already have an account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
                </form>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>By proceeding, you consent to receive emails related to your account, including important updates and notifications. You also agree to our terms of service and privacy policy, ensuring a secure and seamless experience.</p>
            </div>
        </div>
    );
};

export default UserRegister;