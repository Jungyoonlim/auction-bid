'use client';

import { GpuCluster } from '../types/GpuCluster';

interface ClusterNavigationProps {
  gpuClusters: GpuCluster[];
  onClusterClick: (cluster: GpuCluster) => void;
}

const ClusterNavigation: React.FC<ClusterNavigationProps> = ({ gpuClusters, onClusterClick }) => {
  return (
    <div>
      {gpuClusters.map((cluster) => (
        <div
          key={cluster.id}
          onClick={() => onClusterClick(cluster)}
          style={{ cursor: 'pointer' }}
        >
          <h3 className="text-purple-xl font-semibold mb-2">{cluster.name}</h3>
          <p className="text-gray-700 text-base mb-1">GPU Type: {cluster.gpuType}</p>
          <p className="text-gray-700 text-base mb-1">GPU Count: {cluster.gpuCount}</p>
          <p className="text-gray-700 text-base mb-1">Current Bid: {cluster.currentBid}</p>
        </div>
      ))}
    </div>
  );
};

export default ClusterNavigation;