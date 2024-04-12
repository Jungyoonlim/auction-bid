'use client';

import React from 'react';
import { GpuCluster } from '../types/GpuCluster';
import { Card, Button, Badge } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './GPUGrid.css';

// Interface with the properties expected by the GPUGrid component.
interface Props {
  gpuClusters: GpuCluster[];
  onClusterClick: (cluster: GpuCluster) => void;
}

// Renders a GPU grid based on the GPU clusters data 
const GPUGrid: React.FC<Props> = ({ gpuClusters, onClusterClick }) => {
  if (!Array.isArray(gpuClusters)) {
    return <p>No GPU clusters available.</p>;
  }
  // Return the GPU grid
  return (
    <div className="grid">
      {gpuClusters.map((gpu) => (
        <Card key={gpu.id} className="gpu-card">
          <Card.Body>
            <Card.Title className="gpu-title">{gpu.name}</Card.Title>
            <Card.Text className="gpu-details">
              <p><strong>{gpu.startTime.toLocaleString()} - {gpu.endTime.toLocaleString()}</strong></p>
              <p>{gpu.nodes} nodes of {gpu.gpuCount}x {gpu.gpuType}</p>
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