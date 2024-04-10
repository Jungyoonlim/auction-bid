import React from 'react';
import { useParams } from 'react-router-dom';
import { GpuCluster } from '../types';
import BidForm from './BidForm';
import BidHistory from './BidHistory';

interface Props {
  gpuClusters: GpuCluster[];
}

const AuctionDetail: React.FC<Props> = ({ gpuClusters }) => {
  const { clusterId } = useParams<{ clusterId: string }>();
  const gpuCluster = gpuClusters.find((gpu) => gpu.id === clusterId);

  if (!gpuCluster) {
    return <div>GPU Cluster not found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{gpuCluster.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">GPU Type: {gpuCluster.gpuType}</p>
          <p className="text-gray-600">GPU Count: {gpuCluster.gpuCount}</p>
          <p className="text-gray-600">Current Bid: {gpuCluster.currentBid}</p>
          <p className={`text-${gpuCluster.status === 'Available' ? 'green' : 'red'}-500`}>
            Status: {gpuCluster.status}
          </p>
        </div>
        <div>
          <BidForm gpuClusterId={gpuCluster.id} />
          <BidHistory gpuClusterId={gpuCluster.id} />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;