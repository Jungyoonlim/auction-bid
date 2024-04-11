'use client';

import { GpuCluster } from './types/GpuCluster';
import fetchGpuClusters from '../../api/gpuClusters';
import React, { useEffect, useState } from 'react';
import GPUGridWrapper from './components/GPUGridWrapper';
import { Container, Row, Col } from 'react-bootstrap';
import SelectedGpuClusterWrapper from './components/SelectedGpuClusterWrapper';
import ClusterNavigation from './components/clusterNav';
import { useRouter } from 'next/navigation';

const PageContent = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const [selectedGpuCluster, setSelectedGpuCluster] = useState<GpuCluster | null>(null);
  const router = useRouter();

  const handleClusterClick = (cluster: GpuCluster) => {
    router.push(`/bid-form/${cluster.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGpuClusters = await fetchGpuClusters();
      setGpuClusters(fetchedGpuClusters);
      setSelectedGpuCluster(getSelectedGpuCluster());
    };
    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-4xl font-bold mb-4">GPU Cluster Auction</h1>
      <Row>
        <Col md={6}>
          <h2 className="text-2xl font-semibold mb-2">Available GPU Clusters</h2>
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick}>
            <ClusterNavigation gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
          </GPUGridWrapper>
        </Col>
      </Row>
    </Container>
  );
};

// Function to get the selected GPU cluster from the server
function getSelectedGpuCluster(): GpuCluster | null {
  // Replace this with your server-side logic to fetch the selected GPU cluster
  // For demonstration purposes, let's assume it returns a sample GPU cluster object
  return {
    id: "1",
    name: 'Sample Cluster',
    gpuType: 'Sample GPU',
    gpuCount: 4,
    currentBid: 100,
    startTime: new Date(),
    endTime: new Date(),
    bidPrice: 100,
    status: 'available',
  };
}

export default PageContent;