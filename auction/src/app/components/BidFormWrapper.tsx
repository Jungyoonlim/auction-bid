'use client';
import BidForm from './BidForm';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';
import styles from './BidFormWrapper.module.css';

// BidFormWrapperProps interface
interface BidFormWrapperProps {
  gpuCluster: GpuCluster;
}

// Handles the submission of a bid of a GPU cluster.
const BidFormWrapper: React.FC<BidFormWrapperProps> = ({ gpuCluster }) => {
  const router = useRouter();

  // This function is asynchronous and handles the submission of a bid for a GPU cluster.
  const handleBidSubmit = async (gpuCluster: GpuCluster, bidPrice: number, selectedHours: number[]) => {
    try {
      const response = await fetch('pages/api/placeBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sets the content type of the request to JSON.
        },
        body: JSON.stringify({ gpuClusterId: gpuCluster.id, bidPrice, selectedHours }), // Converts the bid data to a JSON string.
      });
  
      // Parses the JSON response from the server.
      const data = await response.json();
  
      // Checks if the request was successful (HTTP status code 200-299).
      if (response.ok) {
        console.log('Bid placed successfully:', data.message); // Logs a success message to the console.
        alert(data.message); // Displays a success message to the user.
        router.push('/'); // Redirects the user to the homepage.
      } else {
        // If the request was not successful, logs and alerts the error message.
        console.error('Error placing bid:', data.message);
        alert(data.message);
      }
    } catch (error) {
      // Catches any network or unexpected errors and logs/alerts a generic failure message.
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return (
    <div className={styles.bidFormWrapper}>
      <BidForm gpuCluster={gpuCluster} onBidSubmit={handleBidSubmit} />
    </div>
  );
};

export default BidFormWrapper;