'use client';

import BidForm from './BidForm';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';

interface BidFormWrapperProps {
  gpuCluster: GpuCluster;
}

const BidFormWrapper: React.FC<BidFormWrapperProps> = ({ gpuCluster }) => {
  const router = useRouter(); 

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