import React from 'react';
import { GpuCluster } from '../types/GpuCluster';

// Props for GPUGrid component - gpuClusters (array of GpuCluster objects) and onClusterClick
interface Props {
    gpuClusters: GpuCluster[]; // An array of GpuCluster objects.
    onClusterClick: (cluster: GpuCluster) => void; // A function to handle click events on a cluster.
}

// Displaying GPU clusters in a grid. Takes in gpuClusters and onClusterClick function as props. 
const GPUGrid: React.FC<Props> = ({ gpuClusters, onClusterClick }) => {
    return (
      // jsx for gpu grid 
      // mapping through gpuClusters and displaying each cluster in a div
      <div>
        {gpuClusters.map((gpu) => (
          <div
            key={gpu.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
            onClick={() => onClusterClick(gpu)}
          >
            <h3 className="text-xl font-semibold mb-2">{gpu.name}</h3>
            <p className="text-gray-600">GPU Type: {gpu.gpuType}</p>
            <p className="text-gray-600">GPU Count: {gpu.gpuCount}</p>
            <p className="text-gray-600">Current Bid: {gpu.currentBid}</p>
            <p className={`text-${gpu.status === 'Available' ? 'green' : 'red'}-500`}>Status: {gpu.status}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default GPUGrid;