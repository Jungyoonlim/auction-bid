'use client';

import './pageContent.css'; 
import { GpuCluster } from './types/GpuCluster';
import { fetchGpuClusters } from '../../pages/api/gpuClusters';
import React, { useEffect, useState } from 'react';
import GPUGridWrapper from './components/GPUGridWrapper';
import { useRouter } from 'next/navigation';

// Main Page of the application.
// Displays all the available compute that will lead to bid forms. 
const PageContent = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const router = useRouter();

  // handle the click on a cluster. 
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
    <div className="py-12 px-6 max-w-screen-xl mx-auto shadow-xl rounded-xl bg-white">
      <h3 className="text-5xl font-bold text-center text-gray-800 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>San Francisco Compute Auction House</h3>
      <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl">
        <div className="w-full p-6 rounded-lg shadow-lg bg-white">
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </div>
      </div>
    </div>
  );
};



export default PageContent;