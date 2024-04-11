'use client';

import React from 'react';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge } from 'react-bootstrap';
import './GPUGrid.css';

interface Props {
  gpuClusters: GpuCluster[];
  onClusterClick: (cluster: GpuCluster) => void;
}

const GPUGrid: React.FC<Props> = ({ gpuClusters, onClusterClick }) => {
  const router = useRouter();

  if (!Array.isArray(gpuClusters)) {
    return <p>No GPU clusters available.</p>;
  }

  return (
    <div className="grid-container">
      {gpuClusters.map((gpu) => (
        <div key={gpu.id} className="grid-item">
          <Card className="gpu-card">
            <Card.Body>
              <Card.Title>{gpu.name}</Card.Title>
              <Card.Text>
                <div className="gpu-info">
                  <p><strong>GPU Type:</strong> {gpu.gpuType}</p>
                  <p><strong>GPU Count:</strong> {gpu.gpuCount}</p>
                  <p><strong>Current Bid:</strong> {gpu.currentBid}</p>
                  <Badge variant={gpu.status === 'Available' ? 'success-badge' : 'danger-badge'}>{gpu.status}</Badge>
                </div>
              </Card.Text>
              <Button className="bid-button" onClick={() => onClusterClick(gpu)}>Place Bid</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};


export default GPUGrid;