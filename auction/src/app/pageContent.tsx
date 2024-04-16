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
    <div className="py-12 px-6 max-w-screen-xl mx-auto bg-white rounded-xl shadow-xl">
      <h3 className="text-6xl font-bold text-center text-black mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>San Francisco Compute Exchange</h3>
      <div className="flex flex-col items-center bg-gray-100 p-10 rounded-xl shadow-2xl">
        <div className="w-full rounded-lg shadow-lg bg-white border-4 border-gold-500">
          <GPUGridWrapper gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </div>
      </div>
    </div>
  );
};



export default PageContent;