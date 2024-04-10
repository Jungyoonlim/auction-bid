'use client'
import { GpuCluster } from './types/GpuCluster';
import fetchGpuClusters from '../../api/gpuClusters';
import React, { useState } from 'react';
import GpuGrid from './components/GPUGrid';
import { Container, Row, Col } from 'react-bootstrap';

export default async function Page() {
  const [selectedGpuCluster, setSelectedGpuCluster] = useState<GpuCluster | null>(null);

  const handleClusterClick = (cluster: GpuCluster) => {
    setSelectedGpuCluster(cluster);
  };

  try {
    const gpuClusters = await fetchGpuClusters();

    return (
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Row>
          <Col md={4}>
            {gpuClusters && gpuClusters.length > 0 ? (
              <GpuGrid gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
            ) : (
              <p>Loading GPU clusters...</p>
            )}
          </Col>
        </Row>
      </Container>
    );
  } catch (error) {
    console.error('Error fetching GPU clusters:', error);
    return (
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Row>
          <Col md={4}>
            <p>Failed to load GPU clusters. Please try again later.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}