'use client';
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';
import { useRouter } from 'next/navigation';

// Interface with the properties expected by the BidForm component.
interface BidFormProps {
  gpuCluster: GpuCluster;
  onBidSubmit: (gpuCluster: GpuCluster, bidPrice: number, selectedHours: number[]) => void;
}

// A form for placing a bid on a GPU cluster.
const BidForm: React.FC<BidFormProps> = ({ gpuCluster, onBidSubmit }) => {
  const [bidPrice, setBidPrice] = useState<number>(gpuCluster.currentBid || 0);
  const router = useRouter();
  // State for selected hours to bid.
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  const [liveBids, setLiveBids] = useState<{ [hour: number]: number }>({});

  // Generate an array of available hours based on the start and end time
  const availableHours = Array.from({ length: gpuCluster.endTime.getHours() - gpuCluster.startTime.getHours() + 1 }, (_, i) => i + gpuCluster.startTime.getHours());

  // Function to handle the selection of hours
  const handleHourSelection = (hour: number) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter((h) => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  // Function to handle changes in the bid price input field. 
  const handleBidPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidPrice(parseFloat(event.target.value));
  };

  const handleBidSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onBidSubmit(gpuCluster, bidPrice, selectedHours);
      alert('Bid placed successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };


    // Fetch live bids for the selected GPU cluster
    useEffect(() => {
      const fetchLiveBids = async () => {
        try {
          const response = await fetch(`/api/getLiveBids?gpuClusterId=${gpuCluster.id}`);
          const data = await response.json();
          setLiveBids(data.liveBids);
        } catch (error) {
          console.error('Error fetching live bids:', error);
        }
      };
  
      fetchLiveBids();
      const interval = setInterval(fetchLiveBids, 5000); // Fetch live bids every 5 seconds
  
      return () => {
        clearInterval(interval);
      };
    }, [gpuCluster.id]);
  
    return (
      <Card>
        <Card.Body>
          <Card.Title className="text-center text-bold">{gpuCluster.name}</Card.Title>
          <Card.Text>
            <p>{gpuCluster.nodes} nodes of {gpuCluster.gpuCount}x {gpuCluster.gpuType}</p>
            <p>{gpuCluster.startTime.toLocaleString()} - {gpuCluster.endTime.toLocaleString()}</p>
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
            <Form.Group controlId="availableHours">
              <Form.Label>Select Hours</Form.Label>
              <div className="d-flex flex-wrap">
                {availableHours.map((hour) => (
                  <Button
                    key={hour}
                    variant={selectedHours.includes(hour) ? 'primary' : 'outline-primary'}
                    className="m-1"
                    onClick={() => handleHourSelection(hour)}
                  >
                    {hour}:00 - {hour + 1}:00
                    {liveBids[hour] && (
                      <span className="ml-2">Current Bid: ${liveBids[hour]}</span>
                    )}
                  </Button>
                ))}
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={selectedHours.length === 0 || bidPrice <= (gpuCluster.currentBid || 0)}
              className="w-100 mt-3"
            >
              Place Bid
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };
  
  export default BidForm;