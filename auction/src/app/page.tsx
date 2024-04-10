import { GpuCluster } from './types/GpuCluster';
import fetchGpuClusters from '../../api/gpuClusters';
import React, { useState } from 'react';
import GpuGrid from './components/GPUGrid';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BidFormWrapper from './components/BidFormWrapper';

export default async function Page() {
  const [selectedGpuCluster, setSelectedGpuCluster] = useState<GpuCluster | null>(null);

  const handleClusterClick = (cluster: GpuCluster) => {
    setSelectedGpuCluster(cluster);
  };

  try {
    const gpuClusters = await fetchGpuClusters();

    return (
      <Container className="py-4">
        <h1 className="text-4xl font-bold mb-4">GPU Cluster Auction</h1>
        <Row>
          <Col md={6}>
            <h2 className="text-2xl font-semibold mb-2">Available GPU Clusters</h2>
            {gpuClusters.length > 0 ? (
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
                  <BidFormWrapper gpuCluster={selectedGpuCluster} />
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