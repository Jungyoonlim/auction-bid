'use client';

import React from 'react';
import { GpuCluster } from '../types/GpuCluster';
import { Card, Button, Badge } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './GPUGrid.css';

interface Props {
  gpuClusters: GpuCluster[];
  onClusterClick: (cluster: GpuCluster) => void;
}

const GPUGrid: React.FC<Props> = ({ gpuClusters, onClusterClick }) => {
  if (!Array.isArray(gpuClusters)) {
    return <p>No GPU clusters available.</p>;
  }

  return (
    <div className="grid">
      {gpuClusters.map((gpu) => (
        <Card key={gpu.id} className="gpu-card">
          <Card.Body>
            <Card.Title className="gpu-title">{gpu.name}</Card.Title>
            <Card.Text className="gpu-details">
              <p><strong>GPU Type:</strong> {gpu.gpuType}</p>
              <p><strong>GPU Count:</strong> {gpu.gpuCount}</p>
              <p><strong>Current Bid:</strong> {gpu.currentBid}</p>
            </Card.Text>
            <Badge className={`status-badge ${gpu.status.toLowerCase()}`}>
              {gpu.status}
            </Badge>
            <Button className="bid-button" onClick={() => onClusterClick(gpu)}>
              <AiOutlineShoppingCart className="me-2" />
              Place Bid
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};


export default GPUGrid;