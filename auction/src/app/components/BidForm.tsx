import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';

interface BidFormProps {
  gpuCluster: GpuCluster;
  onBidSubmit: (gpuCluster: GpuCluster, bidPrice: number) => void;
}

// Displaying and handling bid form. Takes in gpuCluster and onBidSubmit function as props. 
const BidForm: React.FC<BidFormProps> = ({ gpuCluster, onBidSubmit }) => {

  const [bidPrice, setBidPrice] = useState(0);

  // Handling bid price change
  const handleBidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(parseFloat(event.target.value));
  };

  // Handling bid submit
  const handleBidSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    onBidSubmit(gpuCluster, bidPrice); 
  };

  // jsx for bid form
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