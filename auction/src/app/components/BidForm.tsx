'use client';

import React, { useState, useEffect } from 'react';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';

// Interface with the properties expected by the BidForm component.
interface BidFormProps {
  gpuCluster: GpuCluster;
  onBidSubmit: (gpuCluster: GpuCluster, bidPrice: number, selectedHours: number[]) => void;
}

// A form for placing a bid on a GPU cluster.
const BidForm: React.FC<BidFormProps> = ({ gpuCluster, onBidSubmit }) => {
  // State for the bid price
  const [bidPrice, setBidPrice] = useState<number>(gpuCluster.currentBid || 0);
  // Router
  const router = useRouter();
  // State for selected hours to bid
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  // State for live bids
  const [liveBids, setLiveBids] = useState<{ [hour: number]: {price: number} }>({});

  // Generate an array of available hours based on the start and end time
  // If the start and end time are not available, return an empty array. 
  const availableHours = gpuCluster?.endTime?.getHours() && gpuCluster?.startTime?.getHours()
    ? Array.from(
        { length: gpuCluster.endTime.getHours() - gpuCluster.startTime.getHours() },
        (_, i) => i + gpuCluster.startTime.getHours()
      )
    : [];

  // move back to the main page button
  const handleBackToMainPage = () => {
    router.push('/');
  }

  // Function to handle the selection of hours
  const handleHourSelection = (hour: number) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  // Function to handle changes in the bid price input field. 
  const handleBidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(parseFloat(event.target.value));
  };

  // Function to handle the submission of the bid form.
  const handleBidSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('handleBidSubmit function triggered'); 
    try {
      await onBidSubmit(gpuCluster, bidPrice, selectedHours);
      alert('Bid placed successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  // Fetch live bids for the selected GPU cluster
  useEffect(() => {
    const fetchLiveBids = async () => {
      try {
        const response = await fetch(`/api/getLiveBids?gpuClusterId=${gpuCluster.id}`);
        const data = await response.json();
        setLiveBids(data.liveBids);
      } catch (error) {
        console.error('Error fetching live bids:', error);
      }
    };
  
    fetchLiveBids();
    const interval = setInterval(fetchLiveBids, 5000); // Fetch live bids every 5 seconds
  
    return () => {
      clearInterval(interval);
    };
  }, [gpuCluster.id]);
  
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg shadow-lg">
        <div className="md:flex">
          <div className="w-full">
            <button onClick={handleBackToMainPage} className="ml-4 mt-4 px-4 py-2 bg-gray-300 text-black text-sm font-medium rounded-lg hover:bg-gray-400 focus:outline-none">Back</button>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-center font-bold text-xl">{gpuCluster.name}</h3>
                <p className="text-gray-600 text-sm text-center">{gpuCluster.nodes} nodes of {gpuCluster.gpuCount}x {gpuCluster.gpuType}</p>
                <p className="text-gray-600 text-sm text-center">{gpuCluster.startTime.toLocaleString()} - {gpuCluster.endTime.toLocaleString()}</p>
              </div>
              <form onSubmit={handleBidSubmit} className="space-y-3">
                <div>
                  <label htmlFor="bidPrice" className="text-sm font-medium text-gray-900 block mb-2">Bid Price (per hour)</label>
                  <input
                    id="bidPrice"
                    type="number"
                    value={bidPrice}
                    onChange={handleBidPriceChange}
                    step="10"
                    min={gpuCluster.currentBid ? gpuCluster.currentBid + 10 : 0}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="availableHours" className="text-sm font-medium text-gray-900 block mb-2">Select Hours</label>
                  <div className="flex flex-wrap">
                    {availableHours.map((hour) => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => handleHourSelection(hour)}
                        className={`m-1 px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none ${selectedHours.includes(hour) ? 'bg-red-700 hover:bg-red-800' : 'bg-gray-300 hover:bg-gray-400'}`}
                      >
                        {hour}:00 - {hour + 1}:00
                        {liveBids[hour] && (
                          <span className="ml-2 text-gray-200">Current Bid: ${liveBids[hour].price}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none"
                >
                  Place Bid
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BidForm;


 