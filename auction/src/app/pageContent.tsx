'use client';

import './pageContent.css'; 
import { GpuCluster } from './types/GpuCluster';
import { fetchGpuClusters } from '../../api/gpuClusters';
import React, { useEffect, useState } from 'react';
import GPUGridWrapper from './components/GPUGridWrapper';
import { useRouter } from 'next/navigation';

// Main Page of the application.
// Displays all the available compute that will lead to bid forms. 
const PageContent = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const router = useRouter();

  const handleClusterClick = (cluster: GpuCluster) => {
    router.push(`/bid-form/${cluster.id}`);
  };

  // Fetch the GPU clusters from the API.
  useEffect(() => {
    const fetchData = async () => {
      const fetchedGpuClusters = await fetchGpuClusters();
      setGpuClusters(fetchedGpuClusters);
    };
    fetchData();
  }, []);

  // jsx 
  return (
    <div className="py-8 px-4 max-w-screen-xl mx-auto">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>San Francisco Compute Exchange</h3>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </div>
      </div>
    </div>
  );
};



export default PageContent;