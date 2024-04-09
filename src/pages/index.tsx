import React, { useState, useEffect } from 'react';
import GpuGrid from '../components/GPUGrid';
import { Container, Row, Col } from 'react-bootstrap';
import { GpuCluster } from '../types/GpuCluster';
import fetchGpuClusters from '../utils/fetchGpuClusters'; 

export default function Home() {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const [selectedGpuCluster, setSelectedGpuCluster] = useState<GpuCluster | null>(null);

  useEffect(() => {
    fetchGpuData();
  }, []);

  const fetchGpuData = async () => {
    const data = await fetchGpuClusters();
    setGpuClusters(data);
  };

  const handleClusterClick = (cluster: GpuCluster) => {
    setSelectedGpuCluster(cluster);
  };

  return (
    <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Row>
        <Col md={4}>
          <GpuGrid gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </Col>
      </Row>
    </Container>
  );
}