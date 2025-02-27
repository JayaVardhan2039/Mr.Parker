import React from 'react';
import axios from 'axios';

const LocationSearchPanel = (props) => {
  const { pickupSuggestions, setPanelOpen, setVehiclePanel, setPickup } = props;

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-address`, {
            params: { lat: latitude, lng: longitude },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPickup(response.data.address);
          console.log(response);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <div className='flex gap-4 my-2 items-center justify-start mb-8'>
        <h2 className='bg-[#eee] h-8 w-36 flex items-center justify-evenly font-medium rounded-full text-base'>
          <i className="ri-time-fill text-xl"></i>Set a Time
        </h2>
      </div>

      {(pickupSuggestions || []).map((suggestion, index) => (
        <div
          key={index}
          onClick={() => {
            setPickup(suggestion.description || suggestion);  
          }}
          className='flex gap-4 border-2 border-gray-100 active:border-black rounded-xl my-4 items-center justify-start'
        >
          <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-2-fill text-xl"></i>
          </h2>
          <h4 className='font-medium break-words max-w-[80%]'>
            {suggestion.description || suggestion}
          </h4>
        </div>
      ))}

      <div className='flex gap-4 border-2 border-gray-100 active:border-black rounded-xl my-4 items-center justify-start'>
        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
          <i className="ri-crosshair-2-fill text-xl"></i>
        </h2>
        <button onClick={handleCurrentLocationClick}>
          <h4 className='font-medium break-words '>
            Your Current Location
          </h4>
        </button>
      </div>
    </div>
  );
};

export default LocationSearchPanel;