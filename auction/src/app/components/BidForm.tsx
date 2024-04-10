import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';

interface BidFormProps {
  gpuCluster: GpuCluster;
  onBidSubmit: (gpuCluster: GpuCluster, bidPrice: number) => void;
}

const BidForm: React.FC<BidFormProps> = ({ gpuCluster, onBidSubmit }) => {
  const [bidPrice, setBidPrice] = useState(0);

  const handleBidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(parseFloat(event.target.value));
  };

  const handleBidSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onBidSubmit(gpuCluster, bidPrice);
  };

  return (
    <Form onSubmit={handleBidSubmit}>
      <Form.Group controlId="bidPrice">
        <Form.Label>Bid Price (per hour)</Form.Label>
        <Form.Control
          type="number"
          value={bidPrice}
          onChange={handleBidPriceChange}
          step="0.01"
          min="0"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Place Bid
      </Button>
    </Form>
  );
};

export default BidForm;