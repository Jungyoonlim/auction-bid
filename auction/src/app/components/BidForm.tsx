'use client';
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';

interface BidFormProps {
  gpuCluster: GpuCluster;
  onBidSubmit: (gpuCluster: GpuCluster, bidPrice: number) => void;
}

const BidForm: React.FC<BidFormProps> = ({ gpuCluster, onBidSubmit }) => {
  const [bidPrice, setBidPrice] = useState<number>(gpuCluster.currentBid || 0);
  const router = useRouter();

  const handleBidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(parseFloat(event.target.value));
  };

  const handleBidSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onBidSubmit(gpuCluster, bidPrice);
      alert('Bid placed successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Place a Bid</Card.Title>
        <Card.Text>
          <p>
            <strong>GPU Cluster:</strong> {gpuCluster.name}
          </p>
          <p>
            <strong>GPU Type:</strong> {gpuCluster.gpuType}
          </p>
          <p>
            <strong>GPU Count:</strong> {gpuCluster.gpuCount}
          </p>
          <p>
            <strong>Current Bid:</strong> {gpuCluster.currentBid}
          </p>
        </Card.Text>
        <Form onSubmit={handleBidSubmit}>
          <Form.Group controlId="bidPrice">
            <Form.Label>Bid Price (per hour)</Form.Label>
            <Form.Control
              type="number"
              value={bidPrice}
              onChange={handleBidPriceChange}
              step="0.01"
              min={gpuCluster.currentBid || 0}
              required
              className="mb-3"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={bidPrice <= (gpuCluster.currentBid || 0)}
            className="w-100"
          >
            Place Bid
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BidForm;