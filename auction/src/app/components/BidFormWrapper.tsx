'use client';

import BidForm from './BidForm';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';

// BidFormWrapperProps interface 
interface BidFormWrapperProps {
  gpuCluster: GpuCluster;
}

// Handles the submission of a bid of a GPU cluster. 
const BidFormWrapper: React.FC<BidFormWrapperProps> = ({ gpuCluster }) => {
  const router = useRouter(); 

  // Handles the submission of a bid of a GPU cluster. 
  const handleBidSubmit = async (gpuCluster: GpuCluster, bidPrice: number) => {
    try {
      const response = await fetch('/api/placeBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gpuClusterId: gpuCluster.id, bidPrice }),
      });
      if (response.ok) {
        alert('Bid placed successfully!');
        router.push('/');
      } else {
        console.error('Error placing bid:', response.statusText);
        alert('Failed to place bid. Please try again.');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return <BidForm gpuCluster={gpuCluster} onBidSubmit={handleBidSubmit} />;
};

export default BidFormWrapper;