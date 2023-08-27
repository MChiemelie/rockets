import React from 'react';

export default function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed max-w-md border border-black rounded-sm p-4 bg-white mx-auto left-1/2 top-3/5">
      <div className="text-center justify-center space-y-4">
        <h2>{item.mission_name}</h2>
        <p>Mission ID: {item.mission_id}</p>
        <p>Launch Date: {item.launch_date_local}</p>
        <p>Rocket: {item.rocket.rocket_name}</p>
        <p>Details: {item.details}</p>
        <button onClick={onClose} className='px-4 border border-black bg-red-400'>x</button>
      </div>
    </div>
  );
}