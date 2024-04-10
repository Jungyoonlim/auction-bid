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
          <h3>{cluster.name}</h3>
          <p>GPU Type: {cluster.gpuType}</p>
          <p>GPU Count: {cluster.gpuCount}</p>
          <p>Current Bid: {cluster.currentBid}</p>
        </div>
      ))}
    </div>
  );
};

export default ClusterNavigation;