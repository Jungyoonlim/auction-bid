'use client';
import { GpuCluster } from './types/GpuCluster';
import fetchGpuClusters from '../../api/gpuClusters';
import React, { useState } from 'react';
import GpuGrid from './components/GPUGrid';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BidForm from './components/BidForm';

export default async function Page() {
  const [selectedGpuCluster, setSelectedGpuCluster] = useState<GpuCluster | null>(null);

  const handleClusterClick = (cluster: GpuCluster) => {
    setSelectedGpuCluster(cluster);
  };

  const handleBidSubmit = async (gpuCluster: GpuCluster, bidPrice: number) => {
    try {
      const response = await fetch('/api/placeBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gpuCluster, bidPrice }),
      });

      if (response.ok) {
        alert('Bid submitted successfully!');
      } else {
        console.error('Error submitting bid:', response.statusText);
        alert('Failed to submit bid. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    }
  };

  try {
    const gpuClusters = await fetchGpuClusters();

    return (
      <Container className="py-4">
        <h1 className="text-5xl font-bold mb-8 text-center" style={{ fontFamily: 'Arial, sans-serif' }}>San Francisco Compute Exchange</h1>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-700" style={{ fontFamily: 'Helvetica, sans-serif' }}>Select GPU Clusters</h2>
            {gpuClusters && gpuClusters.length > 0 ? (
              <GpuGrid gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
            ) : (
              <p>Loading GPU clusters...</p>
            )}
          </Col>
          <Col md={6}>
            {selectedGpuCluster ? (
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
                  <BidForm gpuCluster={selectedGpuCluster} onBidSubmit={handleBidSubmit} />
                </Card.Body>
              </Card>
            ) : (
              <p>Click on a GPU cluster to view details and place a bid.</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  } catch (error) {
    console.error('Error fetching GPU clusters:', error);
    return (
      <Container className="py-4">
        <h1 className="text-4xl font-bold mb-4">GPU Cluster Auction</h1>
        <p>Failed to load GPU clusters. Please try again later.</p>
      </Container>
    );
  }
}