import React from 'react';
import { Card } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';
import BidFormWrapper from './BidFormWrapper';

interface SelectedGpuClusterProps {
  selectedGpuCluster: GpuCluster | null;
}

const SelectedGpuCluster: React.FC<SelectedGpuClusterProps> = ({ selectedGpuCluster }) => {
  if (!selectedGpuCluster) {
    return <p>Click on a GPU cluster to view details and place a bid.</p>;
  }

  return (
    <Card className="shadow-lg">
      <Card.Body>
        <Card.Title className="text-xl font-semibold mb-2">
          Selected GPU Cluster: {selectedGpuCluster.name}
        </Card.Title>
        <Card.Text>
          <p>GPU Type: {selectedGpuCluster.gpuType}</p>
          <p>GPU Count: {selectedGpuCluster.gpuCount}</p>
          <p>Current Bid: {selectedGpuCluster.currentBid}</p>
        </Card.Text>
        <BidFormWrapper gpuCluster={selectedGpuCluster} />
      </Card.Body>
    </Card>
  );
};

export default SelectedGpuCluster;