import React from "react";
import{ createContext, useState,useContext } from 'react';


export const MrParkerDataContext = createContext();

export const MrParkerContext = ({ children }) => {
    const [mrParker, setMrParker] = useState(null);
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateMrParker=(MrParkerData)=>{
        setMrParker(MrParkerData);
    }
    const value={ mrParker, setMrParker, error, setError, isLoading, setIsLoading, updateMrParker };

    return (
        <MrParkerDataContext.Provider value={value}>
            {children}
        </MrParkerDataContext.Provider>
    );
};

export default MrParkerContext;