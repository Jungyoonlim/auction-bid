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

  // Handles the submission of a bid of a GPU cluster.
  const handleBidSubmit = async (gpuCluster: GpuCluster, bidPrice: number, selectedHours: number[]) => {
    try {
      const response = await fetch('/api/placeBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gpuClusterId: gpuCluster.id, bidPrice, selectedHours }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Bid placed successfully') {
          alert('Bid placed successfully!');
          router.push('/');
        } else {
          console.error('Error placing bid:', data.message);
          alert(data.message);
        }
      } else {
        const errorData = await response.json();
        console.error('Error placing bid:', errorData.message);
        alert('Failed to place bid. Please try again.');
      }
    } catch (error) {
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