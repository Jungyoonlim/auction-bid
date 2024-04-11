'use client';

import { GpuCluster } from './types/GpuCluster';
import {fetchGpuClusters} from '../../api/gpuClusters';
import React, { useEffect, useState } from 'react';
import GPUGridWrapper from './components/GPUGridWrapper';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const PageContent = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const router = useRouter();

  const handleClusterClick = (cluster: GpuCluster) => {
    router.push(`/bid-form/${cluster.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGpuClusters = await fetchGpuClusters();
      setGpuClusters(fetchedGpuClusters);
    };
    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-4xl font-bold mb-4">GPU Cluster Auction</h1>
      <Row>
        <Col md={6}>
          <h2 className="text-2xl font-semibold mb-2">Available GPU Clusters</h2>
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </Col>
      </Row>
    </Container>
  );
};



export default PageContent;