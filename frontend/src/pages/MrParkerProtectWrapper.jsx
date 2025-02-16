import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MrParkerDataContext } from '../Context/MrParkerContext';
import axios from 'axios';

const MrParkerProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { mrParker, setMrParker } = useContext(MrParkerDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.log('No token found, redirecting to login...');
            navigate('/mrparker-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/mrparkers/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Profile data fetched successfully:', response.data.mrParker);
                setMrParker(response.data.mrParker);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.error('Error fetching profile data:', err);
            if (err.response && err.response.status === 401) {
                console.log('Unauthorized, redirecting to login...');
                localStorage.removeItem('token');
                navigate('/mrparker-login');
            } else {
                console.log('Other error, redirecting to login...');
                localStorage.removeItem('token');
                navigate('/mrparker-login');
            }
        });
    }, [token, navigate, setMrParker]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>
            {children}
        </>
    );
}

export default MrParkerProtectWrapper;