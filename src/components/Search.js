import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function Search() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [launchSuccess, setLaunchSuccess] = useState('');
  const [landSuccess, setLandSuccess] = useState('');

  useEffect(() => {
    const offset = (currentPage - 1) * 12;
    const apiUrl = `https://api.spacexdata.com/v3/launches?limit=12&offset=${offset}&launch_success=${launchSuccess}&land_success=${landSuccess}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage, launchSuccess, landSuccess]);

  const handleCurrentPage = page => {
    setCurrentPage(page);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setCurrentPage(1);
  };

  return (
    <section className='bg-white z-10'>
      <div className='m-5'>
        <h1 className='font-medium text-4xl p-8'>Search Form</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-4/5 mx-auto place-content-center">
          <select
            id="rocketDropdown"
            className="flex mx-auto p-2 border rounded w-full"
          >
            <option value="capsules">Capsules</option>
            <option value="cores">Cores</option>
            <option value="dragons">Dragons</option>
            <option value="history">History</option>
            <option value="info">Info</option>
            <option value="landpads">Landing Pads</option>
            <option value="launches">Launches</option>
            <option value="launchpads">Launch Pads</option>
            <option value="missions">Missions</option>
            <option value="payloads">Payloads</option>
            <option value="rockets">Rockets</option>
            <option value="roadster">Roadster</option>
            <option value="ships">Ships</option>
          </select>

            <div className="flex items-center space-x-2">
              <label>Launching:</label>
              <select
                id="statusDropdown"
                className="w-full p-2 border rounded"
                value={launchSuccess}
                onChange={event => setLaunchSuccess(event.target.value)}
              >
                <option value="true">Successful</option>
                <option value="false">Unsuccessful</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label>Landing:</label>
              <select
                id="typeDropdown"
                className="w-full p-2 border rounded"
                value={landSuccess}
                onChange={event => setLandSuccess(event.target.value)}
              >
                <option value="true">Successful</option>
                <option value="false">Unsuccessful</option>
              </select>
            </div>

          <input type="submit" value="Submit" className="p-2 border rounded bg-slate-800 text-white" />

        </form>
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-4/5 mx-auto place-content-center">
          {items.length > 0 ? (
            items.map(item => (
              <div
                key={item.capsule_serial}
                className="place-self-center w-full border border-slate-300 p-4"
              >
                <button onClick={() => setSelectedItem(item)}>
                  {item.links && item.links.mission_patch && (
                    <img src={item.links.mission_patch} alt={`Item ${item.flight_number}`} />
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No capsules available.</p>
          )}
        </div>
        {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </div>

      <div className='flex w-fit mx-auto justify-center my-10 border border-slate-800'>
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            onClick={() => handleCurrentPage(index + 1)}
            className={`p-1 px-4 text-sm text-center ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-900 text-white'
              }`}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <div className='flex justify-between w-4/5 mx-auto my-8'>
        <button className='px-5 py-1 rounded-md border border-gray-300'>Older</button>
        <button className='px-5 py-1 rounded-md border border-gray-300'>Newer</button>
      </div>
    </section>
  );
}