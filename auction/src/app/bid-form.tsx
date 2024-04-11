'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import BidFormWrapper from './components/BidFormWrapper';
import { GpuCluster } from './types/GpuCluster';
import fetchGpuCluster from '../../api/gpuClusters';

interface BidFormPageProps {
  params: { clusterId: string };
}

const BidFormPage: React.FC<BidFormPageProps> = ({ params }) => {
  const { clusterId } = params;

  const gpuCluster = fetchGpuCluster(clusterId);

  if (!gpuCluster) {
    return <p>Cluster not found</p>;
  }

  return (
    <div>
      <h1>Bid Form</h1>
      <BidFormWrapper gpuCluster={gpuCluster} />
    </div>
  );
};

export default BidFormPage;